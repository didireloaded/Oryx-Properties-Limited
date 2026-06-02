'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';

import { MarketData } from '@/types/models';

const FALLBACK: MarketData = {
  id: 'ORY',
  price: 1185,
  change: 15,
  change_pct: 1.28,
  volume: 42350,
  high: 1195,
  low: 1168,
  open: 1170,
  prev_close: 1170,
  market_cap: 1500000000,
  nav: 21.45,
  updated_at: new Date().toISOString(),
};

export function useRealtimeMarket() {
  const [data, setData] = useState<MarketData>(FALLBACK);
  const [isLive, setIsLive] = useState(false);
  const [lastFlash, setLastFlash] = useState<'up' | 'down' | null>(null);
  const prevPrice = useRef<number>(FALLBACK.price);

  useEffect(() => {
    if (!supabase) return;

    // 1. Fetch initial data
    const fetchInitial = async () => {
      if (!supabase) return;
      try {
        const { data: rows, error } = await supabase
          .from('market_data')
          .select('*')
          .eq('id', 'ORY')
          .single();

        if (error) {
          console.error('Error fetching initial market data:', error.message);
          return;
        }

        if (rows) {
          setData(rows as MarketData);
          prevPrice.current = (rows as MarketData).price;
        }
      } catch (err) {
        console.error('Unexpected error in fetchInitial:', err);
      }
    };

    fetchInitial();

    if (!supabase) return;

    // 2. Subscribe to realtime changes
    const channel = supabase
      .channel('market-data-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'market_data',
          filter: 'id=eq.ORY',
        },
        (payload) => {
          const newData = payload.new as MarketData;
          const direction = newData.price > prevPrice.current ? 'up' : newData.price < prevPrice.current ? 'down' : null;
          prevPrice.current = newData.price;

          setData(newData);
          setIsLive(true);

          if (direction) {
            setLastFlash(direction);
            setTimeout(() => setLastFlash(null), 600);
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setIsLive(true);
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          console.warn('Realtime channel error or timeout', status);
          setIsLive(false);
        }
      });

    return () => {
      supabase?.removeChannel(channel);
    };
  }, []);

  return { data, isLive, lastFlash };
}
