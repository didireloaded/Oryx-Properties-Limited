'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Bell, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { DocumentData } from './DocumentCard';

export function NensTimeline() {
  const [announcements, setAnnouncements] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .or('category.ilike.%nens%,document_type.ilike.%announcement%')
          .order('year', { ascending: false })
          .limit(5);
          
        if (data && !error) {
          setAnnouncements(data);
        }
      } catch (err) {
        console.error('Error fetching announcements:', err);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-light text-white flex items-center gap-3">
          <Bell className="w-6 h-6 text-[#B78A2D]" />
          NENS <span className="font-semibold text-[#B78A2D]">Announcements</span>
        </h3>
        <button className="text-sm font-medium text-white/50 hover:text-white transition-colors">
          View All
        </button>
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-6 pl-6 md:pl-10 space-y-8">
        {announcements.map((announcement, index) => (
          <motion.div 
            key={announcement.id || index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-[#B78A2D] shadow-[0_0_10px_rgba(183,138,45,0.5)] group-hover:scale-150 transition-transform duration-300"></div>
            
            <div className="glass-panel-15 p-5 rounded-xl border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all duration-300">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-[#B78A2D] uppercase tracking-wider bg-[#B78A2D]/10 px-2 py-1 rounded">
                  {announcement.published_date || announcement.year}
                </span>
                
                <a 
                  href={announcement.file_url}
                  download
                  className="w-8 h-8 rounded-full glass-panel-15 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Download className="w-3 h-3" />
                </a>
              </div>
              
              <h4 className="text-white font-medium text-base mb-2 pr-8">{announcement.title}</h4>
              {announcement.description && (
                <p className="text-sm text-white/60 line-clamp-2">{announcement.description}</p>
              )}
            </div>
          </motion.div>
        ))}
        
        {announcements.length === 0 && (
          <div className="text-white/50 py-4">Loading announcements...</div>
        )}
      </div>
    </div>
  );
}
