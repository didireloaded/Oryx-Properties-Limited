'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Share2, FileText, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { DocumentData } from './DocumentCard';

interface DocumentViewerModalProps {
  document: DocumentData;
  onClose: () => void;
}

export function DocumentViewerModal({ document, onClose }: DocumentViewerModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Prevent background scrolling
  useEffect(() => {
    window.document.body.style.overflow = 'hidden';
    return () => {
      window.document.body.style.overflow = 'auto';
    };
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(document.file_url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-md"
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl h-[90vh] flex flex-col md:flex-row bg-[#172033]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden glass-card-premium"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Mobile Close (visible only on small screens) */}
        <div className="md:hidden flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="text-white font-medium truncate pr-4">{document.title}</h3>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full glass-panel-15 flex items-center justify-center text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Viewer Area */}
        <div className="flex-1 relative bg-black/20 h-full">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50">
              <div className="w-10 h-10 border-2 border-[#B78A2D] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm tracking-widest uppercase">Loading Document...</p>
            </div>
          )}
          <iframe 
            src={`${document.file_url}#toolbar=0&navpanes=0`} 
            className="w-full h-full border-0"
            title={document.title}
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {/* Info Panel */}
        <div className="w-full md:w-80 lg:w-96 flex flex-col border-l border-white/10 bg-[#0F172A]/40 backdrop-blur-3xl p-6 h-full overflow-y-auto hidden md:flex">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 glass-panel-15 rounded-xl border border-white/5">
              <FileText className="w-6 h-6 text-[#B78A2D]" />
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full glass-panel-15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <h2 className="text-2xl font-light text-white leading-tight mb-2">
            {document.title}
          </h2>
          
          <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-[#B78A2D] mb-6 pb-6 border-b border-white/10">
            <span>{document.category}</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span>{document.year}</span>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sm">
              <span className="text-white/50 flex items-center gap-2"><Calendar className="w-4 h-4" /> Published</span>
              <span className="text-white">{document.published_date || document.year}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50 flex items-center gap-2"><FileText className="w-4 h-4" /> Type</span>
              <span className="text-white capitalize">{document.document_type || 'PDF Document'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50 flex items-center gap-2"><Info className="w-4 h-4" /> Size</span>
              <span className="text-white">{document.file_size || 'Unknown'}</span>
            </div>
            {document.page_count && (
              <div className="flex justify-between text-sm">
                <span className="text-white/50 flex items-center gap-2"><FileText className="w-4 h-4" /> Pages</span>
                <span className="text-white">{document.page_count}</span>
              </div>
            )}
          </div>
          
          <div className="mt-auto space-y-3">
            <a 
              href={document.file_url}
              download
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 bg-[#B78A2D] hover:bg-[#D4B05E] text-[#0F172A] font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <Download className="w-5 h-5" /> Download PDF
            </a>
            <button 
              onClick={handleShare}
              className="w-full py-4 glass-panel-15 hover:bg-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-2 border border-white/5 transition-all duration-300"
            >
              {isCopied ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5" />}
              {isCopied ? 'Link Copied!' : 'Share Document'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
