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
              className={`relative flex items-center gap-3.5 p-4 rounded-xl text-left transition-all duration-200 border ${
                isSelected
                  ? 'bg-white border-slate-800 shadow-[0_4px_16px_rgba(15,23,42,0.08)] ring-1 ring-slate-800'
                  : 'bg-white/70 border-slate-200/90 hover:bg-white hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Category Icon */}
              <div
                className={`p-2.5 rounded-lg transition-colors ${
                  isSelected
                    ? isSecurity
                      ? 'bg-red-50 text-red-600'
                      : 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {getIcon(cat.iconName)}
              </div>

              {/* Text & Counter */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3
                    className={`text-[15px] font-bold truncate ${
                      isSelected ? 'text-slate-950' : 'text-slate-700'
                    }`}
                  >
                    {cat.name}
                  </h3>
                  {cat.subcategories.some((s) => s.destacada) && (
                    <span className="shrink-0 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  )}
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {cat.subcategories.length}{' '}
                  {cat.subcategories.length === 1 ? 'subcategoría' : 'subcategorías'}
                </p>
              </div>

              {/* Active Indicator bar */}
              {isSelected && (
                <div className="absolute -bottom-px left-4 right-4 h-0.5 bg-slate-900 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
