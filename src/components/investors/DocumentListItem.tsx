'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, Calendar, File } from 'lucide-react';
import { DocumentData } from './DocumentCard';
import { DocumentViewerModal } from './DocumentViewerModal';

interface DocumentListItemProps {
  document: DocumentData;
  index: number;
}

export function DocumentListItem({ document, index }: DocumentListItemProps) {
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.03 }}
        className="glass-card-premium group relative overflow-hidden mb-3"
      >
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 z-10 relative">
          
          {/* Icon / Type indicator */}
          <div className="w-12 h-12 flex-shrink-0 rounded-xl glass-panel-35 flex items-center justify-center text-white/50 group-hover:text-[#B78A2D] group-hover:bg-[#B78A2D]/10 transition-colors duration-300">
            <FileText className="w-6 h-6" />
          </div>

          {/* Core Info */}
          <div className="flex-grow min-w-0 flex flex-col justify-center">
            <h3 className="text-lg font-medium text-white truncate group-hover:text-[#B78A2D] transition-colors duration-300">
              {document.title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-white/50">
              <span className="font-bold uppercase tracking-widest text-[#B78A2D]/80">
                {document.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {document.year}
              </span>
              <span className="flex items-center gap-1">
                <File className="w-3 h-3" /> {document.file_size || 'PDF'}
              </span>
              {document.page_count && (
                <span className="flex items-center gap-1">
                  {document.page_count} Pages
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0 pt-4 sm:pt-0 border-t border-white/5 sm:border-t-0">
            <button
              onClick={() => setIsViewerOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2 glass-panel-35 hover:bg-white/10 text-white text-xs font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-white/5 hover:border-white/20 whitespace-nowrap"
            >
              <Eye className="w-4 h-4" /> View
            </button>
            <a
              href={document.file_url}
              download
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 glass-panel-35 hover:bg-[#B78A2D]/20 hover:border-[#B78A2D]/30 text-white hover:text-[#B78A2D] text-xs font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-white/5 whitespace-nowrap"
            >
              <Download className="w-4 h-4" /> Download
            </a>
          </div>

        </div>
        
        {/* Subtle background glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#B78A2D]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
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
