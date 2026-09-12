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
    <div className="w-full bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">
            Subcategorías de <span className="text-blue-600">{categoryName}</span>
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
              className={`group relative flex items-center justify-between p-3 sm:py-3 sm:px-3.5 rounded-xl text-left transition-all duration-150 border ${
                isSelected
                  ? isDestacada
                    ? 'bg-red-50 border-red-400 text-red-950 font-semibold shadow-sm ring-1 ring-red-400'
                    : 'bg-slate-900 text-white font-semibold shadow-sm border-slate-900 ring-1 ring-slate-900'
                  : isDestacada
                  ? 'bg-red-50/60 border-red-200/90 text-red-900 hover:bg-red-50 hover:border-red-300 font-medium'
                  : 'bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-slate-100/90 hover:text-slate-900 hover:border-slate-300 font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {isDestacada ? (
                  <ShieldAlert
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-red-700' : 'text-red-500'
                    }`}
                  />
                ) : (
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isSelected
                        ? 'text-white'
                        : 'text-slate-300 group-hover:text-slate-400'
                    }`}
                  />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm truncate block">{sub.name}</span>
                  </div>
                </div>
              </div>

              {/* Badges / Indicators */}
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {isDestacada && (
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md tracking-wider ${
                      isSelected
                        ? 'bg-red-600 text-white'
                        : 'bg-red-200 text-red-800'
                    }`}
                  >
                    Destacada
                  </span>
                )}
                <ChevronRight
                  className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${
                    isSelected
                      ? isDestacada
                        ? 'text-red-700'
                        : 'text-white'
                      : 'text-slate-400'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
