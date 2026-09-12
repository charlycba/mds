import Fuse, { type FuseResultMatch } from 'fuse.js';
import { Category, Subcategory } from '../types';

interface SearchRecord {
  category: Category;
  subcategory: Subcategory;
  name: string;
  categoryName: string;
  tag: string;
  descripcionBreve: string;
  sintomas: string[];
  causas: string[];
  pasos: string[];
  prevencion: string[];
  casosEspeciales: string[];
}

export interface SearchResult {
  category: Category;
  subcategory: Subcategory;
  matchReason: string;
}

const KEY_LABELS: Record<string, string> = {
  name: 'Nombre del tema',
  tag: 'En etiqueta',
  descripcionBreve: 'En descripción',
  sintomas: 'En síntomas',
  causas: 'En causas',
  pasos: 'En solución paso a paso',
  prevencion: 'En prevención / verificación',
  casosEspeciales: 'En casos especiales',
  categoryName: 'Categoría',
};

function toRecord(category: Category, subcategory: Subcategory): SearchRecord {
  const data = subcategory.data;
  return {
    category,
    subcategory,
    name: subcategory.name,
    categoryName: category.name,
    tag: subcategory.tag ?? '',
    descripcionBreve: subcategory.descripcionBreve ?? '',
    sintomas: data.sintomas ?? [],
    causas: data.causas ?? [],
    pasos: data.pasos ?? [],
    prevencion: data.prevencion ?? [],
    casosEspeciales: data.casosEspeciales ?? [],
  };
}

const KEY_PRIORITY: Record<string, number> = {
  name: 0,
  tag: 1,
  descripcionBreve: 2,
  sintomas: 3,
  causas: 4,
  pasos: 5,
  prevencion: 6,
  casosEspeciales: 7,
  categoryName: 8,
};

function describeMatch(matches?: readonly FuseResultMatch[]): string {
  if (!matches || matches.length === 0) return 'Coincidencia';
  const best = [...matches].sort(
    (a, b) =>
      (KEY_PRIORITY[a.key ?? ''] ?? 99) - (KEY_PRIORITY[b.key ?? ''] ?? 99),
  )[0];
  const key = best.key ?? '';
  if (key === 'categoryName') return `Categoría ${best.value ?? ''}`;
  return KEY_LABELS[key] ?? 'Coincidencia';
}

/**
 * Builds a Fuse.js index over every knowledge card and returns a search
 * function. The index is built once (memoized by the caller) and rewards
 * matches on the topic name over matches deep inside the article body.
 */
export function createKnowledgeSearch(categories: Category[]) {
  const records = categories.flatMap((category) =>
    category.subcategories.map((subcategory) => toRecord(category, subcategory)),
  );

  const fuse = new Fuse(records, {
    includeMatches: true,
    ignoreLocation: true,
    threshold: 0.35,
    minMatchCharLength: 2,
    keys: [
      { name: 'name', weight: 2.5 },
      { name: 'tag', weight: 1.5 },
      { name: 'descripcionBreve', weight: 1.2 },
      { name: 'categoryName', weight: 1 },
      { name: 'sintomas', weight: 1 },
      { name: 'causas', weight: 1 },
      { name: 'pasos', weight: 1 },
      { name: 'prevencion', weight: 0.8 },
      { name: 'casosEspeciales', weight: 0.8 },
    ],
  });

  return (query: string): SearchResult[] => {
    const term = query.trim();
    if (term.length < 2) return [];
    return fuse.search(term).map((result) => ({
      category: result.item.category,
      subcategory: result.item.subcategory,
      matchReason: describeMatch(result.matches),
    }));
  };
}
