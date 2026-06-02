-- ============================================================
-- Realtime Market Data for Oryx Properties (ORY on NSX)
-- ============================================================

-- 1. Create the market_data table
CREATE TABLE IF NOT EXISTS public.market_data (
  id TEXT PRIMARY KEY,                  -- Ticker symbol, e.g. 'ORY'
  price NUMERIC NOT NULL,               -- Current share price (NAD cents)
  change NUMERIC NOT NULL DEFAULT 0,    -- Price change from previous close
  change_pct NUMERIC NOT NULL DEFAULT 0,-- % change
  volume INTEGER NOT NULL DEFAULT 0,    -- Shares traded today
  high NUMERIC NOT NULL,                -- Intraday high
  low NUMERIC NOT NULL,                 -- Intraday low
  open NUMERIC NOT NULL,                -- Opening price
  prev_close NUMERIC NOT NULL,          -- Previous close
  market_cap NUMERIC NOT NULL,          -- Market capitalisation (N$)
  nav NUMERIC NOT NULL DEFAULT 21.45,   -- Net Asset Value per unit
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Enable RLS + public read
ALTER TABLE public.market_data ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access on market_data" ON public.market_data;
CREATE POLICY "Allow public read access on market_data" ON public.market_data FOR SELECT USING (true);

-- 3. Seed initial row for ORY
INSERT INTO public.market_data (id, price, change, change_pct, volume, high, low, open, prev_close, market_cap, nav, updated_at)
VALUES ('ORY', 1185, 15, 1.28, 42350, 1195, 1168, 1170, 1170, 1500000000, 21.45, now())
ON CONFLICT (id) DO NOTHING;

-- 4. Simulator function — randomly fluctuates price ±0.5%
CREATE OR REPLACE FUNCTION public.simulate_market_tick()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  curr_price NUMERIC;
  curr_open NUMERIC;
  curr_high NUMERIC;
  curr_low NUMERIC;
  curr_prev_close NUMERIC;
  curr_volume INTEGER;
  new_price NUMERIC;
  price_delta NUMERIC;
  shares_outstanding NUMERIC := 126582278; -- ~126.6M linked units
BEGIN
  SELECT price, open, high, low, prev_close, volume
  INTO curr_price, curr_open, curr_high, curr_low, curr_prev_close, curr_volume
  FROM public.market_data
  WHERE id = 'ORY';

  IF curr_price IS NULL THEN
    RETURN;
  END IF;

  -- Random walk: ±0.5% max per tick
  price_delta := curr_price * (random() - 0.5) * 0.01;
  new_price := ROUND(curr_price + price_delta, 2);

  -- Ensure price stays positive
  IF new_price < 100 THEN
    new_price := 100;
  END IF;

  UPDATE public.market_data
  SET
    price = new_price,
    change = ROUND(new_price - curr_prev_close, 2),
    change_pct = ROUND(((new_price - curr_prev_close) / curr_prev_close) * 100, 2),
    high = GREATEST(curr_high, new_price),
    low = LEAST(curr_low, new_price),
    volume = curr_volume + FLOOR(random() * 500 + 50),
    market_cap = ROUND(new_price * shares_outstanding / 100, 0),  -- price is in cents
    updated_at = now()
  WHERE id = 'ORY';
END;
$$;

-- 5. Enable pg_cron (must be enabled in Dashboard → Extensions first)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- 6. Schedule the simulator to run every 5 seconds
SELECT cron.schedule(
  'simulate-ory-market-tick',
  '5 seconds',
  $$SELECT public.simulate_market_tick()$$
);

-- 7. Enable Realtime for market_data table
-- NOTE: You must ALSO enable Realtime for this table in
-- Dashboard → Database → Replication → toggle ON for market_data
ALTER PUBLICATION supabase_realtime ADD TABLE public.market_data;
