import React from 'react';
import { Category } from '../types';
import { Users, AlertCircle, ShieldAlert, FileText } from 'lucide-react';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-5 h-5" />;
      case 'alert-circle':
        return <AlertCircle className="w-5 h-5" />;
      case 'shield-alert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'file-text':
        return <FileText className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full" id="categories-navigation">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Categorías Principales
        </span>
        <span className="text-xs text-slate-400 font-medium">
          Selecciona una categoría para desplegar sus temas
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {categories.map((cat) => {
          const isSelected = cat.id === selectedCategoryId;
          const isSecurity = cat.id === 'seguridad';

          return (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              aria-pressed={isSelected}
              className={`aly-cat-btn group ${isSelected ? 'is-selected' : ''}`}
            >
              {/* Capas decorativas: estrellas + aura */}
              <span className="aly-cat-btn__stars" aria-hidden="true" />
              <span className="aly-cat-btn__glow" aria-hidden="true">
                <span className="aly-cat-btn__circle" />
                <span className="aly-cat-btn__circle" />
              </span>

              <div className="aly-cat-btn__content">
                {/* Category Icon */}
                <div
                  className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                    isSelected
                      ? isSecurity
                        ? 'bg-red-500/20 text-red-300 ring-1 ring-red-400/50'
                        : 'bg-gradient-to-br from-[#00bed6] to-[#00758d] text-white shadow-[0_0_18px_rgba(0,190,214,0.5)]'
                      : isSecurity
                      ? 'bg-red-500/10 text-red-300/90'
                      : 'bg-white/10 text-[#7ad7e6] group-hover:bg-white/15'
                  }`}
                >
                  {getIcon(cat.iconName)}
                </div>

                {/* Text & Counter */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3
                      className={`text-[15px] font-bold truncate ${
                        isSelected ? 'text-white' : 'text-cyan-50/90'
                      }`}
                    >
                      {cat.name}
                    </h3>
                    {cat.subcategories.some((s) => s.destacada) && (
                      <span className="shrink-0 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    )}
                  </div>
                  <p className="text-xs text-cyan-100/70 truncate mt-0.5">
                    {cat.subcategories.length}{' '}
                    {cat.subcategories.length === 1 ? 'subcategoría' : 'subcategorías'}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
