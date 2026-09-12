import React, { useState } from 'react';
import { Subcategory } from '../types';
import { Copy, Check, ShieldAlert, Clock, ArrowRight, Layers, UserCheck, AlertTriangle } from 'lucide-react';

interface KnowledgeCardsGridProps {
  subcategory: Subcategory;
  categoryName: string;
}

export const KnowledgeCardsGrid: React.FC<KnowledgeCardsGridProps> = ({
  subcategory,
  categoryName,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const { data } = subcategory;

  const hasSpecialCases = Boolean(data.casosEspeciales && data.casosEspeciales.length > 0);

  const handleCopyAll = () => {
    let formattedText = `=====================================================
CATEGORÍA: ${categoryName.toUpperCase()}
SUB-TEMA: ${subcategory.name.toUpperCase()}
${data.tiempoEstimado ? `TIEMPO ESTIMADO: ${data.tiempoEstimado}\n` : ''}${data.aplicaA ? `APLICA A: ${data.aplicaA}\n` : ''}${data.uso ? `USO: ${data.uso}\n` : ''}=====================================================

⚠️ ${(data.tituloSintomas || 'SÍNTOMAS COMUNES').toUpperCase()}:
${data.sintomas.map((s) => `• ${s}`).join('\n')}

💡 ${(data.tituloCausas || 'CAUSAS PROBABLES').toUpperCase()}:
${data.causas.map((c) => `• ${c}`).join('\n')}

🧭 ${(data.tituloPasos || 'SOLUCIÓN PASO A PASO').toUpperCase()}:
${data.pasos.join('\n')}

✅ ${(data.tituloPrevencion || 'CONSEJOS DE PREVENCIÓN').toUpperCase()}:
${data.prevencion.map((p) => `• ${p}`).join('\n')}
`;

    if (hasSpecialCases && data.casosEspeciales) {
      formattedText += `\n🚨 ${(data.tituloCasosEspeciales || 'SI ESTO NO FUNCIONA / CASOS ESPECIALES').toUpperCase()}:
${data.casosEspeciales.map((item) => `• ${item}`).join('\n')}
`;
    }

    navigator.clipboard.writeText(formattedText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2200);
  };

  return (
    <div className="w-full space-y-6" id={`content-section-${subcategory.id}`}>
      {/* Subcategory Header & Metadata */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          {/* Breadcrumb path */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-500 uppercase mb-1 flex-wrap">
            <span>{categoryName}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-bold">{subcategory.name}</span>
            {subcategory.destacada && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase bg-red-100 text-red-700 border border-red-300 animate-pulse">
                <ShieldAlert className="w-3 h-3" />
                {subcategory.tag || 'Sev 1 Destacada'}
              </span>
            )}
            {hasSpecialCases && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                5 Bloques de resolución
              </span>
            )}
          </div>

          {/* Subcategory Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            {subcategory.name}
          </h2>

          {subcategory.descripcionBreve && (
            <p className="text-sm text-slate-600 mt-1 max-w-3xl">
              {subcategory.descripcionBreve}
            </p>
          )}

          {/* Metadata Chips: Aplica a, Uso, Tiempo estimado */}
          {(data.aplicaA || data.uso || data.tiempoEstimado) && (
            <div className="flex items-center gap-2 mt-2.5 flex-wrap text-xs">
              {data.aplicaA && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/90 font-medium">
                  <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>Aplica a: <strong>{data.aplicaA}</strong></span>
                </div>
              )}
              {data.uso && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/90 font-medium">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  <span>Uso: <strong>{data.uso}</strong></span>
                </div>
              )}
              {data.tiempoEstimado && (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tiempo estimado: <strong>{data.tiempoEstimado}</strong></span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
          <button
            type="button"
            id="btn-copy-guide"
            onClick={handleCopyAll}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all shadow-sm border ${
              copiedAll
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-2 ring-emerald-200'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98]'
            }`}
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>¡Guía copiada con éxito!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar información completa</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sev1 Critical Banner if highlighted */}
      {subcategory.destacada && (
        <div
          id="sev1-critical-banner"
          className="rounded-xl border-2 border-red-300 bg-red-50 p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-red-600 text-white rounded-xl shrink-0 mt-0.5 shadow-sm">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base font-extrabold text-red-950 uppercase tracking-wide">
                  Protocolo Crítico de Seguridad — Incidente Severidad 1
                </h3>
                <span className="text-[11px] bg-red-700 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Prioridad Inmediata
                </span>
              </div>
              <p className="text-xs sm:text-sm text-red-900 mt-1 max-w-2xl font-medium">
                Cualquier usuario que reporte ver datos ajenos requiere atención prioritaria. NO modificar datos, NO cerrar sesión del usuario por cuenta propia y avisar de inmediato por el canal oficial de Sev1.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-red-950 bg-white/90 px-3.5 py-2.5 rounded-xl border border-red-200 shrink-0 shadow-xs">
            <Clock className="w-4 h-4 text-red-600" />
            <span>Tiempo Estimado: 5 min</span>
          </div>
        </div>
      )}

      {/* Cards Grid: 4 cards normally, or 5 cards when special cases exist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: ⚠️ Síntomas Comunes (Red/Rose) */}
        <div
          id="card-sintomas-comunes"
          className="relative bg-[#faf4f4] border border-[#edd7d7] rounded-xl border-l-[6px] border-l-[#c03952] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="text-lg leading-none" role="img" aria-label="Alerta">
              ⚠️
            </span>
            <h3 className="text-[17px] font-bold text-[#8c1c34] tracking-tight">
              {data.tituloSintomas || 'Síntomas Comunes'}
            </h3>
          </div>
          <ul className="space-y-2.5 text-[15px] text-slate-700 leading-relaxed pl-1">
            {data.sintomas.map((sintoma, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#8c1c34] text-lg leading-none select-none font-bold">
                  •
                </span>
                <span className="flex-1">{sintoma}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 2: 💡 Causas Probables (Amber/Yellow) */}
        <div
          id="card-causas-probables"
          className="relative bg-[#fcfaf1] border border-[#f0e7c6] rounded-xl border-l-[6px] border-l-[#d97706] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="text-lg leading-none" role="img" aria-label="Bombilla">
              💡
            </span>
            <h3 className="text-[17px] font-bold text-[#92400e] tracking-tight">
              {data.tituloCausas || 'Causas Probables'}
            </h3>
          </div>
          <ul className="space-y-2.5 text-[15px] text-slate-700 leading-relaxed pl-1">
            {data.causas.map((causa, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#b45309] text-lg leading-none select-none font-bold">
                  •
                </span>
                <span className="flex-1">{causa}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 3: 🧭 Solución Paso a Paso / Pasos de Resolución (Blue) */}
        <div
          id="card-guia-paso-a-paso"
          className="relative bg-[#f3f7fb] border border-[#d2e2f2] rounded-xl border-l-[6px] border-l-[#2563eb] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="text-lg leading-none" role="img" aria-label="Brújula">
              🧭
            </span>
            <h3 className="text-[17px] font-bold text-[#1e40af] tracking-tight">
              {data.tituloPasos || 'Solución Paso a Paso'}
            </h3>
          </div>
          <ol className="space-y-2.5 text-[15px] text-slate-700 leading-relaxed">
            {data.pasos.map((paso, idx) => {
              const cleanText = paso.replace(/^\d+\.\s*/, '');
              return (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-bold text-[#1e40af] shrink-0 min-w-[20px] text-right">
                    {idx + 1}.
                  </span>
                  <span className="flex-1">{cleanText}</span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Card 4: ✅ Consejos de Prevención / Verificación Exitosa (Green) */}
        <div
          id="card-consejos-prevencion"
          className="relative bg-[#f2f8f4] border border-[#cbe5d4] rounded-xl border-l-[6px] border-l-[#10b981] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="text-lg leading-none" role="img" aria-label="Check">
              ✅
            </span>
            <h3 className="text-[17px] font-bold text-[#166534] tracking-tight">
              {data.tituloPrevencion || 'Consejos de Prevención'}
            </h3>
          </div>
          <ul className="space-y-2.5 text-[15px] text-slate-700 leading-relaxed pl-1">
            {data.prevencion.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#059669] text-lg leading-none select-none font-bold">
                  •
                </span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5th Block (Red): 🚨 SI ESTO NO FUNCIONA / CASOS ESPECIALES */}
        {hasSpecialCases && data.casosEspeciales && (
          <div
            id="card-casos-especiales-5to-bloque"
            className="md:col-span-2 relative bg-[#faf4f4] border border-[#edd7d7] rounded-xl border-l-[6px] border-l-[#c03952] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="text-lg leading-none" role="img" aria-label="Alerta roja">
                🚨
              </span>
              <h3 className="text-[17px] font-bold text-[#8c1c34] tracking-tight">
                {data.tituloCasosEspeciales || 'Si Esto No Funciona / Casos Especiales'}
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 uppercase tracking-wider ml-auto">
                Casos Especiales
              </span>
            </div>
            <ul className="space-y-2 text-[15px] text-slate-700 leading-relaxed pl-1">
              {data.casosEspeciales.map((caso, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#8c1c34] text-lg leading-none select-none font-bold">
                    •
                  </span>
                  <span className="flex-1 font-medium">{caso}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
