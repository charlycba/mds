import React from 'react';
import { Subcategory } from '../types';
import { ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

interface SubcategoryTabsProps {
  subcategories: Subcategory[];
  selectedSubcategoryId: string;
  onSelectSubcategory: (id: string) => void;
  categoryName: string;
}

export const SubcategoryTabs: React.FC<SubcategoryTabsProps> = ({
  subcategories,
  selectedSubcategoryId,
  onSelectSubcategory,
  categoryName,
}) => {
  return (
    <div
      id="subcategories-navigation"
      className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#00bed6]" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Subcategorías de <span className="text-[#00758d]">{categoryName}</span>
          </h3>
          <span className="text-xs text-slate-500 font-normal">
            ({subcategories.length} temas disponibles)
          </span>
        </div>
        <span className="text-xs text-slate-400">
          Haz clic en cualquier tema para ver la guía y síntomas
        </span>
      </div>

      {/* Responsive Grid / Pills of Subcategories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {subcategories.map((sub) => {
          const isSelected = sub.id === selectedSubcategoryId;
          const isDestacada = sub.destacada;

          return (
            <button
              key={sub.id}
              id={`subcat-btn-${sub.id}`}
              type="button"
              onClick={() => onSelectSubcategory(sub.id)}
              aria-pressed={isSelected}
              className={`aly-galaxy-btn group ${isSelected ? 'is-selected' : ''} ${
                isDestacada ? 'is-destacada' : ''
              }`}
            >
              {/* Capas decorativas: profundidad + galaxia de estrellas */}
              <span className="aly-galaxy-btn__backdrop" aria-hidden="true" />
              <span className="aly-galaxy-btn__galaxy" aria-hidden="true" />

              <span className="aly-galaxy-btn__text">
                <span className="flex items-center gap-2.5 min-w-0 flex-1">
                  {isDestacada ? (
                    <ShieldAlert
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-red-300' : 'text-red-400'
                      }`}
                    />
                  ) : (
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isSelected
                          ? 'text-white'
                          : 'text-cyan-200/70 group-hover:text-cyan-100'
                      }`}
                    />
                  )}

                  <span className="min-w-0 flex-1">
                    <span
                      className={`text-sm truncate block ${
                        isSelected || isDestacada
                          ? 'text-white font-semibold'
                          : 'text-cyan-50/90 font-medium'
                      }`}
                    >
                      {sub.name}
                    </span>
                  </span>
                </span>

                {/* Badges / Indicators */}
                <span className="flex items-center gap-1.5 shrink-0 ml-2">
                  {isDestacada && (
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider ${
                        isSelected
                          ? 'bg-red-500 text-white'
                          : 'bg-red-500/20 text-red-200 ring-1 ring-red-400/40'
                      }`}
                    >
                      Destacada
                    </span>
                  )}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                      isSelected
                        ? isDestacada
                          ? 'text-red-300'
                          : 'text-white'
                        : 'text-cyan-200/60 group-hover:text-cyan-100'
                    }`}
                  />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
