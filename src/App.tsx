import React, { useState } from 'react';
import { CATEGORIES_DATA } from './data/categoriesData';
import { Header } from './components/Header';
import { CategoryTabs } from './components/CategoryTabs';
import { SubcategoryTabs } from './components/SubcategoryTabs';
import { KnowledgeCardsGrid } from './components/KnowledgeCardsGrid';
import { EscalationTemplateWidget } from './components/EscalationTemplateWidget';
import { VantaBackground } from './components/VantaBackground';
import { BirdCompanion } from './components/BirdCompanion';
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
    <>
      {/* Fondo animado Vanta.js (paleta Aly) */}
      <VantaBackground />

      {/* Pajaro companero que vuela al boton presionado */}
      <BirdCompanion />

      <div className="relative z-10 min-h-screen text-slate-800 flex flex-col antialiased">
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
            <span className="text-[#00758d] font-bold bg-[#e6f4f7] px-2 py-0.5 rounded-md border border-[#b9dfe6]">
              {activeSubcategory.name}
            </span>
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
      <footer className="aly-footer mt-16 py-8 text-xs text-white/80">
        <div className="aly-footer__lightings" aria-hidden="true">
          <span className="aly-footer__light aly-footer__light--1" />
          <span className="aly-footer__light aly-footer__light--2" />
          <span className="aly-footer__light aly-footer__light--3" />
          <span className="aly-footer__light aly-footer__light--4" />
          <span className="aly-footer__light aly-footer__light--5" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <span className="font-semibold text-white">Aly</span>
        </div>
      </footer>
      </div>
    </>
  );
}
