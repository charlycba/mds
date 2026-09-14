import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, Menu } from 'lucide-react';
import { Category } from '../types';
import { createKnowledgeSearch } from '../lib/searchIndex';
import headerBg from './header.jpg';

interface HeaderProps {
  categories: Category[];
  onSelectResult: (categoryId: string, subcategoryId: string) => void;
  backgroundEnabled: boolean;
  onToggleBackground: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  categories,
  onSelectResult,
  backgroundEnabled,
  onToggleBackground,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Indexed search (Fuse.js). The index is built once per categories reference.
  const runSearch = useMemo(() => createKnowledgeSearch(categories), [categories]);
  const searchResults = useMemo(
    () => (searchTerm.trim().length >= 2 ? runSearch(searchTerm) : []),
    [runSearch, searchTerm],
  );

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (searchRef.current && !searchRef.current.contains(target)) {
        setIsOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // El header no queda fijo: se desvanece a medida que se hace scroll hacia abajo.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const FADE_DISTANCE = 160;
    let frame = 0;

    const update = () => {
      const progress = Math.min(1, window.scrollY / FADE_DISTANCE);
      el.style.opacity = String(1 - progress);
      el.style.transform = `translateY(${-progress * 16}px)`;
      el.style.pointerEvents = progress > 0.95 ? 'none' : 'auto';
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="w-full border-b border-slate-200/80 z-30 shadow-xs bg-slate-100 will-change-[opacity,transform]"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.78) 42%, rgba(255,255,255,0.28) 100%), url(${headerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="h-1 w-full bg-gradient-to-r from-[#00758d] via-[#00bed6] to-[#ee7623]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="aly-logo" role="img" aria-label="ALY">
            <span className="aly-logo__base" aria-hidden="true">
              ALY
            </span>
            <span className="aly-logo__letters" aria-hidden="true">
              <span className="aly-loader-letter">A</span>
              <span className="aly-loader-letter">L</span>
              <span className="aly-loader-letter">Y</span>
            </span>
            <span className="aly-logo__loader" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-tight">
                Centro de Soporte & Base de Conocimiento
              </h1>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Guías operativas, resolución de incidentes técnicos y protocolos de seguridad
            </p>
          </div>
        </div>

        {/* Global Instant Search + Config menu */}
        <div className="flex items-start gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-96 md:flex-none" ref={searchRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="input-global-search"
              placeholder="Buscar síntoma, error 404, 500, etc ..."
              value={searchTerm}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
              }}
              className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#008aab] focus:ring-1 focus:ring-[#008aab] transition-all shadow-xs"
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
                          <span className="text-xs font-bold text-slate-900 group-hover:text-[#008aab] truncate">
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
                      <span className="text-xs text-slate-400 group-hover:text-[#008aab] font-semibold shrink-0">
                        Ver guía →
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          </div>

          {/* Menú de configuración (hamburguesa) */}
          <div className="relative shrink-0" ref={menuRef}>
            <button
              type="button"
              aria-label="Configuración"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white/80 text-slate-600 hover:text-[#008aab] hover:border-slate-300 shadow-xs transition-colors"
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 pb-2">
                  Configuración
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={backgroundEnabled}
                  aria-label="Fondo"
                  onClick={onToggleBackground}
                  className="w-full flex items-center justify-between gap-3 px-1.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">
                    Fondo
                  </span>
                  <span
                    className={`relative inline-flex h-4 w-8 shrink-0 items-center rounded-full transition-colors ${
                      backgroundEnabled ? 'bg-[#008aab]' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform ${
                        backgroundEnabled ? 'translate-x-4' : 'translate-x-0.5'
                      }`}
                    />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
