'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Download, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { DocumentData } from './DocumentCard';

export function AnnualReportsTimeline() {
  const [reports, setReports] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .or('category.ilike.%report%,document_type.ilike.%report%')
          .order('year', { ascending: false })
          .limit(4);
          
        if (data && !error) {
          setReports(data);
        }
      } catch (err) {
        console.error('Error fetching reports:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const sortedReports = [...reports];

  return (
    <section className="py-24 border-t border-white/10 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/50 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-2">
              Annual <span className="font-semibold text-[#B78A2D]">Reports</span>
            </h2>
            <p className="text-white/60 max-w-xl">
              Explore our integrated annual reports tracking performance, strategy, and value creation.
            </p>
          </div>
          <button className="flex items-center gap-2 text-[#B78A2D] hover:text-white transition-colors duration-300 font-medium">
            View All Archive <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sortedReports.map((report, index) => (
            <motion.div 
              key={report.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative w-full aspect-[1/1.4] rounded-2xl overflow-hidden mb-6 border border-white/10 glass-panel-35 flex items-center justify-center">
                {/* Fallback Cover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#172033] to-[#0F172A] opacity-80"></div>
                
                {report.thumbnail ? (
                  <img src={report.thumbnail} alt={report.title} className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                ) : (
                  <div className="relative z-10 text-center p-6">
                    <div className="text-5xl font-light text-[#B78A2D] opacity-40 mb-4">{report.year}</div>
                    <div className="text-sm font-semibold tracking-widest uppercase text-white/50">Integrated Report</div>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                  <a 
                    href={report.file_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-[#B78A2D] hover:bg-[#D4B05E] text-[#0F172A] flex items-center justify-center transition-transform duration-300 hover:scale-110"
                  >
                    <Eye className="w-5 h-5" />
                  </a>
                  <a 
                    href={report.file_url} 
                    download
                    className="w-12 h-12 rounded-full glass-panel-35 border border-white/20 text-white flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-white/10"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-white mb-2 line-clamp-2">{report.title}</h3>
              <p className="text-sm text-white/50 line-clamp-2 flex-grow">{report.description || 'Download the full integrated annual report for comprehensive insights.'}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
