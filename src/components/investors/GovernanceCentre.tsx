'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Scale, FileSignature, Users, Landmark } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { DocumentData } from './DocumentCard';

export function GovernanceCentre() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchGovDocs = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('documents')
          .select('*')
          .or('category.ilike.%governance%,document_type.ilike.%governance%');
          
        if (data && !error) {
          setDocuments(data);
        }
      } catch (err) {
        console.error('Error fetching governance docs:', err);
      }
    };
    fetchGovDocs();
  }, []);

  const govDocs = documents;

  const categories = [
    { title: 'Board Charters', icon: <Users className="w-6 h-6" />, count: govDocs.filter(d => d.title.toLowerCase().includes('charter')).length },
    { title: 'Policies', icon: <FileSignature className="w-6 h-6" />, count: govDocs.filter(d => d.title.toLowerCase().includes('policy')).length },
    { title: 'Trust Deeds', icon: <Landmark className="w-6 h-6" />, count: govDocs.filter(d => d.title.toLowerCase().includes('deed')).length },
    { title: 'Ethics & Compliance', icon: <Scale className="w-6 h-6" />, count: govDocs.filter(d => d.title.toLowerCase().includes('ethic') || d.title.toLowerCase().includes('code')).length },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Col - Info */}
          <div className="w-full md:w-1/3 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Governance <span className="font-semibold text-[#B78A2D]">Centre</span>
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Oryx Properties is committed to the highest standards of corporate governance, transparency, and ethical business practices in alignment with the King IV Report.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {categories.map((cat, i) => (
                <div key={i} className="glass-panel-35 p-4 rounded-xl border border-white/5 flex flex-col gap-3">
                  <div className="text-[#B78A2D]">{cat.icon}</div>
                  <div>
                    <div className="text-white font-medium text-sm">{cat.title}</div>
                    <div className="text-white/40 text-xs">{cat.count || 0} Documents</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Col - Docs */}
          <div className="w-full md:w-2/3 glass-card-premium p-8">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
              <h3 className="text-xl font-medium text-white">Latest Governance Documents</h3>
              <a href="#" className="text-sm font-medium text-[#B78A2D] hover:text-white transition-colors">View All</a>
            </div>
            
            <div className="flex flex-col gap-2">
              {govDocs.slice(0, 6).map((doc, index) => (
                <motion.div 
                  key={doc.id || index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full glass-panel-35 flex items-center justify-center text-white/50 group-hover:text-[#B78A2D]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm group-hover:text-[#B78A2D] transition-colors">{doc.title}</h4>
                      <div className="text-xs text-white/40 mt-1">{doc.published_date || doc.year}</div>
                    </div>
                  </div>
                  
                  <a 
                    href={doc.file_url}
                    download
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-white/10 text-white transition-all"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
              
              {govDocs.length === 0 && (
                <div className="py-12 text-center text-white/50">
                  Loading governance documents...
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
