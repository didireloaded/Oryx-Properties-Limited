'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ChevronDown, RefreshCw, LayoutGrid, List as ListIcon, Check } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { DocumentCard, DocumentData } from './DocumentCard';
import { DocumentListItem } from './DocumentListItem';
import fallbackDocs from '@/data/documents.json';

// Custom Dropdown Component for a premium feel
function CustomDropdown({ 
  options, 
  value, 
  onChange, 
  label 
}: { 
  options: string[], 
  value: string, 
  onChange: (val: string) => void,
  label: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[#0F172A]/80 border border-white/10 hover:border-[#B78A2D]/50 rounded-xl px-4 py-3 text-white transition-all duration-300 text-left"
      >
        <span className="truncate pr-4">{value === 'All' ? `All ${label}s` : value}</span>
        <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-[#1A2235] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
          >
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors ${
                  value === opt ? 'text-[#B78A2D] bg-[#B78A2D]/10' : 'text-white'
                }`}
              >
                <span className="truncate">{opt === 'All' ? `All ${label}s` : opt}</span>
                {value === opt && <Check className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DocumentLibrary() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Layout
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  
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
        console.warn('Supabase not configured, using fallback documents');
        setDocuments(fallbackDocs as DocumentData[]);
        // Extract unique categories and years for filters
        const uniqueCategories = Array.from(new Set(fallbackDocs.map(d => d.category))).sort();
        const uniqueYears = Array.from(new Set(fallbackDocs.map(d => d.year.toString()))).sort((a, b) => Number(b) - Number(a));
        
        setCategories(['All', ...uniqueCategories]);
        setYears(['All', ...uniqueYears]);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .order('year', { ascending: false })
        .order('title', { ascending: true });
        
      if (error) {
        console.error('Error fetching documents:', error);
        setDocuments(fallbackDocs as DocumentData[]);
        const uniqueCategories = Array.from(new Set(fallbackDocs.map(d => d.category))).sort();
        const uniqueYears = Array.from(new Set(fallbackDocs.map(d => d.year.toString()))).sort((a, b) => Number(b) - Number(a));
        setCategories(['All', ...uniqueCategories]);
        setYears(['All', ...uniqueYears]);
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
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Header & Controls */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
            Document <span className="font-semibold text-[#B78A2D]">Library</span>
          </h2>
          <p className="text-white/60 max-w-xl text-lg">
            Access our comprehensive repository of financial reports, governance documents, and announcements.
          </p>
        </div>
        
        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative group w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-[#B78A2D] transition-colors">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#1A2235]/60 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#B78A2D]/50 focus:ring-1 focus:ring-[#B78A2D]/50 transition-all glass-panel-35"
            />
          </div>
          
          <div className="flex gap-4">
            {/* Filter Toggle */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border transition-all duration-300 font-medium ${
                isFilterOpen 
                  ? 'bg-[#B78A2D]/20 border-[#B78A2D]/40 text-[#B78A2D]' 
                  : 'glass-panel-35 border-white/10 text-white hover:bg-white/5'
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 glass-panel-35 border border-white/10 rounded-xl hidden sm:flex">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-[#B78A2D]/20 text-[#B78A2D] shadow-sm' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
                title="List View"
              >
                <ListIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-[#B78A2D]/20 text-[#B78A2D] shadow-sm' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
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
            <div className="p-6 glass-card-premium border-l-4 border-l-[#B78A2D] rounded-2xl flex flex-wrap gap-6 bg-[#1A2235]/40">
              <div className="flex-1 min-w-[220px]">
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Document Category
                </label>
                <CustomDropdown 
                  options={categories} 
                  value={selectedCategory} 
                  onChange={setSelectedCategory} 
                  label="Category"
                />
              </div>
              
              <div className="flex-1 min-w-[220px]">
                <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
                  Financial Year
                </label>
                <CustomDropdown 
                  options={years} 
                  value={selectedYear} 
                  onChange={setSelectedYear} 
                  label="Year"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Results */}
      {loading ? (
        <div className="py-32 flex flex-col items-center justify-center text-white/50">
          <div className="w-12 h-12 border-2 border-[#B78A2D] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-medium tracking-wide">Loading Library...</p>
        </div>
      ) : filteredDocuments.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-24 flex flex-col items-center justify-center text-center glass-card-premium rounded-2xl border border-white/5"
        >
          <div className="w-20 h-20 rounded-full glass-panel-35 flex items-center justify-center mb-6">
            <Search className="w-10 h-10 text-white/30" />
          </div>
          <h3 className="text-2xl font-medium text-white mb-3">No documents found</h3>
          <p className="text-white/50 max-w-md text-lg">
            We couldn't find any documents matching your current filters. Try adjusting your search term or clearing the filters.
          </p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedYear('All');
            }}
            className="mt-8 flex items-center gap-2 px-8 py-3 bg-[#B78A2D] hover:bg-[#D4B05E] text-[#0F172A] font-semibold rounded-xl transition-colors shadow-[0_0_20px_rgba(183,138,45,0.3)]"
          >
            <RefreshCw className="w-4 h-4" /> Reset Filters
          </button>
        </motion.div>
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center text-sm text-white/50 font-medium">
            <span>Showing <span className="text-white">{filteredDocuments.length}</span> documents</span>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredDocuments.map((doc, index) => (
                  <DocumentCard key={doc.id} document={doc} index={index} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col">
              <AnimatePresence>
                {filteredDocuments.map((doc, index) => (
                  <DocumentListItem key={doc.id} document={doc} index={index} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </div>
  );
}
