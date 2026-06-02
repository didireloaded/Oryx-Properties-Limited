'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, X, Share2, Calendar, File, CheckCircle2 } from 'lucide-react';
import { DocumentViewerModal } from './DocumentViewerModal';

export interface DocumentData {
  id: string;
  title: string;
  category: string;
  year: number;
  published_date: string;
  description?: string;
  document_type: string;
  file_url: string;
  file_size: string;
  page_count?: number;
  thumbnail?: string;
}

interface DocumentCardProps {
  document: DocumentData;
  index: number;
}

export function DocumentCard({ document, index }: DocumentCardProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="glass-card-premium group relative overflow-hidden flex flex-col h-full"
      >
        <div className="p-6 flex flex-col h-full z-10 relative">
          
          <div className="flex justify-between items-start mb-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B78A2D] mb-1">
                {document.category}
              </span>
              <span className="text-xs text-white/60 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {document.year}
              </span>
            </div>
            
            <div className="w-10 h-10 rounded-full glass-panel-35 flex items-center justify-center text-white/50 group-hover:text-[#B78A2D] group-hover:bg-[#B78A2D]/10 transition-colors duration-300">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          
          <h3 className="text-lg font-medium text-white mb-4 line-clamp-2 leading-tight flex-grow">
            {document.title}
          </h3>
          
          <div className="flex justify-between items-center text-xs text-white/50 mb-6 pt-4 border-t border-white/10">
            <span className="flex items-center gap-1">
              <File className="w-3 h-3" /> {document.file_size || 'PDF'}
            </span>
            {document.page_count && (
              <span className="flex items-center gap-1">
                {document.page_count} Pages
              </span>
            )}
          </div>
          
          <div className="flex gap-2 mt-auto">
            <button 
              onClick={() => setIsViewerOpen(true)}
              className="flex-1 py-2.5 glass-panel-35 hover:bg-white/10 text-white text-xs font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-white/5 hover:border-white/20"
            >
              <Eye className="w-4 h-4" /> View Online
            </button>
            <a 
              href={document.file_url}
              download
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 flex-shrink-0 glass-panel-35 hover:bg-[#B78A2D]/20 hover:border-[#B78A2D]/30 text-white hover:text-[#B78A2D] rounded-xl transition-all duration-300 flex items-center justify-center border border-white/5"
            >
              <Download className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Subtle background glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#B78A2D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-24"></div>
      </motion.div>
      
      <AnimatePresence>
        {isViewerOpen && (
          <DocumentViewerModal 
            document={document} 
            onClose={() => setIsViewerOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
