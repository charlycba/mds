import React, { useState } from 'react';
import { CATEGORIES_DATA } from './data/categoriesData';
import { Header } from './components/Header';
import { CategoryTabs } from './components/CategoryTabs';
import { SubcategoryTabs } from './components/SubcategoryTabs';
import { KnowledgeCardsGrid } from './components/KnowledgeCardsGrid';
import { EscalationTemplateWidget } from './components/EscalationTemplateWidget';
import { HelpCircle, ChevronRight, Layers, ExternalLink } from 'lucide-react';

export default function App() {
  // Start on 'cuentas-y-accesos' and 'acceso-y-contrasenas' to match the user's reference image directly
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('cuentas-y-accesos');
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>('acceso-y-contrasenas');

  // Find current active category
  const activeCategory =
    CATEGORIES_DATA.find((c) => c.id === selectedCategoryId) || CATEGORIES_DATA[0];

  // Find current active subcategory
  const activeSubcategory =
    activeCategory.subcategories.find((s) => s.id === selectedSubcategoryId) ||
    activeCategory.subcategories[0];

  // Handle category change: select category and its first subcategory
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const targetCat = CATEGORIES_DATA.find((c) => c.id === categoryId);
    if (targetCat && targetCat.subcategories.length > 0) {
      setSelectedSubcategoryId(targetCat.subcategories[0].id);
    }
  };

  // Handle search result selection
  const handleSelectSearchResult = (categoryId: string, subcategoryId: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubcategoryId(subcategoryId);
    // Smooth scroll down to content
    setTimeout(() => {
      const element = document.getElementById(`content-section-${subcategoryId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col antialiased">
      {/* Top Header with Global Search */}
      <Header
        categories={CATEGORIES_DATA}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro / Context Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 pb-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-slate-700">Ruta de navegación:</span>
            <span className="text-slate-400">Inicio</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-600 font-medium">{activeCategory.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              {activeSubcategory.name}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Diseño con tonos desaturados, calma y alta legibilidad</span>
          </div>
        </div>

        {/* Step 1: Top Categories Selector */}
        <section aria-label="Categorías principales">
          <CategoryTabs
            categories={CATEGORIES_DATA}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleSelectCategory}
          />
        </section>

        {/* Step 2: Subcategories Selector */}
        <section aria-label="Subcategorías desplegadas">
          <SubcategoryTabs
            subcategories={activeCategory.subcategories}
            selectedSubcategoryId={activeSubcategory.id}
            onSelectSubcategory={(subId) => setSelectedSubcategoryId(subId)}
            categoryName={activeCategory.name}
          />
        </section>

        {/* Step 3: Information in the 4-Card Format (as in the screenshot) */}
        <section aria-label="Detalle de información y guía técnica">
          <KnowledgeCardsGrid
            subcategory={activeSubcategory}
            categoryName={activeCategory.name}
          />

          {/* Special add-on for "Plantillas y escalamiento" */}
          {activeSubcategory.id === 'plantilla-comunicacion-escalamiento' && (
            <EscalationTemplateWidget />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-700">
              Base de Conocimiento HelpDesk IT
            </span>
            <span className="text-slate-400">• Sistema de consulta y resolución</span>
          </div>
          <div className="flex items-center gap-6">
            <span>4 Categorías principales</span>
            <span>16 Temas estructurados</span>
            <span className="text-slate-400">Formato: Síntomas • Causas • Guía • Prevención</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
