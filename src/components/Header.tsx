import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Category } from '../types';
import { createKnowledgeSearch } from '../lib/searchIndex';

interface HeaderProps {
  categories: Category[];
  onSelectResult: (categoryId: string, subcategoryId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ categories, onSelectResult }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Indexed search (Fuse.js). The index is built once per categories reference.
  const runSearch = useMemo(() => createKnowledgeSearch(categories), [categories]);
  const searchResults = useMemo(
    () => (searchTerm.trim().length >= 2 ? runSearch(searchTerm) : []),
    [runSearch, searchTerm],
  );

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-sm">
            KB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                Centro de Soporte & Base de Conocimiento
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                v2.4 Oficial
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Guías operativas, resolución de incidentes técnicos y protocolos de seguridad
            </p>
          </div>
        </div>

        {/* Global Instant Search */}
        <div className="relative w-full md:w-96" ref={searchRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="input-global-search"
              placeholder="Buscar síntoma, error 404, 500, Sev1, contraseña..."
              value={searchTerm}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all shadow-xs"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {isOpen && searchTerm.trim().length >= 2 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 max-h-80 overflow-y-auto z-50 p-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1">
                {searchResults.length} Resultados encontrados
              </div>

              {searchResults.length === 0 ? (
                <div className="px-4 py-6 text-center text-xs text-slate-500">
                  No se encontraron coincidencias para "{searchTerm}". Intenta con palabras clave como <span className="font-semibold">login</span>, <span className="font-semibold">404</span> o <span className="font-semibold">permisos</span>.
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.map(({ category, subcategory, matchReason }) => (
                    <button
                      key={`${category.id}-${subcategory.id}`}
                      type="button"
                      onClick={() => {
                        onSelectResult(category.id, subcategory.id);
                        setIsOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-between group"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate">
                            {subcategory.name}
                          </span>
                          {subcategory.destacada && (
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 bg-red-100 text-red-700 rounded">
                              Sev 1
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">
                          {category.name} • <span className="text-slate-400">{matchReason}</span>
                        </p>
                      </div>
                      <span className="text-xs text-slate-400 group-hover:text-blue-600 font-semibold shrink-0">
                        Ver guía →
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
