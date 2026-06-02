'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ChevronDown, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { DocumentCard, DocumentData } from './DocumentCard';

export function DocumentLibrary() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  
  // Filter options
  const [categories, setCategories] = useState<string[]>(['All']);
  const [years, setYears] = useState<string[]>(['All']);
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      if (!supabase) {
        console.warn('Supabase not configured, using empty documents array');
        setDocuments([]);
        return;
      }
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('year', { ascending: false })
        .order('title', { ascending: true });
        
      if (error) {
        console.error('Error fetching documents:', error);
        return;
      }
      
      if (data) {
        setDocuments(data);
        
        // Extract unique categories and years for filters
        const uniqueCategories = Array.from(new Set(data.map(d => d.category))).sort();
        const uniqueYears = Array.from(new Set(data.map(d => d.year.toString()))).sort((a, b) => Number(b) - Number(a));
        
        setCategories(['All', ...uniqueCategories]);
        setYears(['All', ...uniqueYears]);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            doc.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
      const matchesYear = selectedYear === 'All' || doc.year.toString() === selectedYear;
      
      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [documents, searchTerm, selectedCategory, selectedYear]);

  return (
    <div className="w-full max-w-7xl mx-auto py-12">
      {/* Header & Controls */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-2">
            Document <span className="font-semibold text-[#B78A2D]">Library</span>
          </h2>
          <p className="text-white/60 max-w-xl">
            Access our comprehensive repository of financial reports, governance documents, and announcements.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#B78A2D] transition-colors">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-3 bg-[#1A2235]/60 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#B78A2D]/50 focus:ring-1 focus:ring-[#B78A2D]/50 transition-all glass-panel-15"
            />
          </div>
          
          {/* Filter Toggle */}
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300 font-medium ${
              isFilterOpen 
                ? 'bg-[#B78A2D]/20 border-[#B78A2D]/40 text-[#B78A2D]' 
                : 'glass-panel-15 border-white/10 text-white hover:bg-white/5'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>
      
      {/* Expanded Filters */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="p-6 glass-card-premium rounded-2xl flex flex-wrap gap-6">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Category
                </label>
                <div className="relative">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-[#0F172A]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B78A2D]/50 cursor-pointer"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-[#0F172A] text-white">{cat}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-white/50">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                  Year
                </label>
                <div className="relative">
                  <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full appearance-none bg-[#0F172A]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#B78A2D]/50 cursor-pointer"
                  >
                    {years.map(year => (
                      <option key={year} value={year} className="bg-[#0F172A] text-white">{year}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-white/50">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Results */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-white/50">
          <div className="w-12 h-12 border-2 border-[#B78A2D] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-medium tracking-wide">Loading Library...</p>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <div className="py-20 flex flex-col items-center justify-center text-center glass-card-premium rounded-2xl">
          <Search className="w-12 h-12 text-white/20 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No documents found</h3>
          <p className="text-white/50 max-w-md">
            We couldn't find any documents matching your current filters. Try adjusting your search term or clearing the filters.
          </p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedYear('All');
            }}
            className="mt-6 flex items-center gap-2 px-6 py-2 bg-[#B78A2D] hover:bg-[#D4B05E] text-[#0F172A] font-semibold rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 text-sm text-white/50 font-medium">
            Showing <span className="text-white">{filteredDocuments.length}</span> documents
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredDocuments.map((doc, index) => (
                <DocumentCard key={doc.id} document={doc} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
