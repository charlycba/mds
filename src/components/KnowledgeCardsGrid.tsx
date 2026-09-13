import React, { useEffect, useRef } from 'react';
import { Subcategory } from '../types';
import { ShieldAlert, Clock, ArrowRight, Layers, UserCheck } from 'lucide-react';
import { ScrambleText } from './ScrambleText';
import { BorderBeam } from './BorderBeam';

interface KnowledgeCardsGridProps {
  subcategory: Subcategory;
  categoryName: string;
}

export const KnowledgeCardsGrid: React.FC<KnowledgeCardsGridProps> = ({
  subcategory,
  categoryName,
}) => {
  const { data } = subcategory;
  const rootRef = useRef<HTMLDivElement>(null);

  const hasSpecialCases = Boolean(data.casosEspeciales && data.casosEspeciales.length > 0);

  // Rebote de las cards al cambiar de tema: saltan y se acomodan en su lugar.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>('[id^="card-"], #sev1-critical-banner'),
    );
    const animations = cards.map((card, index) =>
      card.animate(
        [
          { transform: 'translateY(14px) scale(0.96)', opacity: 0.5 },
          { transform: 'translateY(-16px) scale(1.03)', opacity: 1, offset: 0.35 },
          { transform: 'translateY(0) scale(0.995)', offset: 0.62 },
          { transform: 'translateY(-6px) scale(1.01)', offset: 0.8 },
          { transform: 'translateY(0) scale(1)', opacity: 1 },
        ],
        {
          duration: 720,
          delay: index * 70,
          easing: 'ease-out',
          fill: 'both',
        },
      ),
    );

    return () => animations.forEach((animation) => animation.cancel());
  }, [subcategory.id]);

  return (
    <div ref={rootRef} className="w-full space-y-6" id={`content-section-${subcategory.id}`}>
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
                  <ScrambleText text="Protocolo Crítico de Seguridad — Incidente Severidad 1" trigger={subcategory.id} />
                </h3>
                <span className="text-[11px] bg-red-700 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  <ScrambleText text="Prioridad Inmediata" trigger={subcategory.id} />
                </span>
              </div>
              <p className="text-xs sm:text-sm text-red-900 mt-1 max-w-2xl font-medium">
                <ScrambleText text="Cualquier usuario que reporte ver datos ajenos requiere atención prioritaria. NO modificar datos, NO cerrar sesión del usuario por cuenta propia y avisar de inmediato por el canal oficial de Sev1." trigger={subcategory.id} />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-red-950 bg-white/90 px-3.5 py-2.5 rounded-xl border border-red-200 shrink-0 shadow-xs">
            <Clock className="w-4 h-4 text-red-600" />
            <span>
              <ScrambleText text="Tiempo Estimado: 5 min" trigger={subcategory.id} />
            </span>
          </div>
        </div>
      )}

      {/* Cards Grid: 4 cards normally, or 5 cards when special cases exist */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: ⚠️ Síntomas Comunes (Naranja Aly) */}
        <div
          id="card-sintomas-comunes"
          className="relative bg-[#fdf4ed] border border-[#f6ddc8] rounded-xl border-l-[6px] border-l-[#ee7623] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="text-lg leading-none" role="img" aria-label="Alerta">
              ⚠️
            </span>
            <h3 className="text-[17px] font-bold text-[#9a400f] tracking-tight">
              <ScrambleText text={data.tituloSintomas || 'Síntomas Comunes'} trigger={subcategory.id} />
            </h3>
          </div>
          <ul className="space-y-2.5 text-[15px] text-slate-700 leading-relaxed pl-1">
            {data.sintomas.map((sintoma, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#d15e14] text-lg leading-none select-none font-bold">
                  •
                </span>
                <ScrambleText text={sintoma} className="flex-1" delay={idx * 45} trigger={subcategory.id} />
              </li>
            ))}
          </ul>
          <BorderBeam duration={6} borderWidth={1.5} colorFrom="#ee7623" colorTo="#f6a35e" />
          <BorderBeam duration={6} delay={3} borderWidth={1} colorFrom="#f6a35e" colorTo="#ee7623" />
        </div>

        {/* Card 2: 💡 Causas Probables (Ámbar Aly) */}
        <div
          id="card-causas-probables"
          className="relative bg-[#fdf8ee] border border-[#f5e4c8] rounded-xl border-l-[6px] border-l-[#e99b35] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="text-lg leading-none" role="img" aria-label="Bombilla">
              💡
            </span>
            <h3 className="text-[17px] font-bold text-[#8a5a12] tracking-tight">
              <ScrambleText text={data.tituloCausas || 'Causas Probables'} trigger={subcategory.id} />
            </h3>
          </div>
          <ul className="space-y-2.5 text-[15px] text-slate-700 leading-relaxed pl-1">
            {data.causas.map((causa, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#c07d1f] text-lg leading-none select-none font-bold">
                  •
                </span>
                <ScrambleText text={causa} className="flex-1" delay={idx * 45} trigger={subcategory.id} />
              </li>
            ))}
          </ul>
          <BorderBeam duration={6} borderWidth={1.5} colorFrom="#e99b35" colorTo="#f3c078" />
          <BorderBeam duration={6} delay={3} borderWidth={1} colorFrom="#f3c078" colorTo="#e99b35" />
        </div>

        {/* Card 3: 🧭 Solución Paso a Paso / Pasos de Resolución (Cyan Aly) */}
        <div
          id="card-guia-paso-a-paso"
          className="relative bg-[#eef9fb] border border-[#cbeaf1] rounded-xl border-l-[6px] border-l-[#00bed6] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="text-lg leading-none" role="img" aria-label="Brújula">
              🧭
            </span>
            <h3 className="text-[17px] font-bold text-[#006b80] tracking-tight">
              <ScrambleText text={data.tituloPasos || 'Solución Paso a Paso'} trigger={subcategory.id} />
            </h3>
          </div>
          <ol className="space-y-2.5 text-[15px] text-slate-700 leading-relaxed">
            {data.pasos.map((paso, idx) => {
              const cleanText = paso.replace(/^\d+\.\s*/, '');
              return (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="font-bold text-[#00758d] shrink-0 min-w-[20px] text-right">
                    {idx + 1}.
                  </span>
                  <ScrambleText text={cleanText} className="flex-1" delay={idx * 45} trigger={subcategory.id} />
                </li>
              );
            })}
          </ol>
          <BorderBeam duration={6} borderWidth={1.5} colorFrom="#00bed6" colorTo="#7fe3ef" />
          <BorderBeam duration={6} delay={3} borderWidth={1} colorFrom="#7fe3ef" colorTo="#00bed6" />
        </div>

        {/* Card 4: ✅ Consejos de Prevención / Verificación Exitosa (Teal Aly) */}
        <div
          id="card-consejos-prevencion"
          className="relative bg-[#eef7f9] border border-[#cbe4ea] rounded-xl border-l-[6px] border-l-[#008aab] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="text-lg leading-none" role="img" aria-label="Check">
              ✅
            </span>
            <h3 className="text-[17px] font-bold text-[#00596b] tracking-tight">
              <ScrambleText text={data.tituloPrevencion || 'Consejos de Prevención'} trigger={subcategory.id} />
            </h3>
          </div>
          <ul className="space-y-2.5 text-[15px] text-slate-700 leading-relaxed pl-1">
            {data.prevencion.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-[#00758d] text-lg leading-none select-none font-bold">
                  •
                </span>
                <ScrambleText text={item} className="flex-1" delay={idx * 45} trigger={subcategory.id} />
              </li>
            ))}
          </ul>
          <BorderBeam duration={6} borderWidth={1.5} colorFrom="#008aab" colorTo="#59c0d6" />
          <BorderBeam duration={6} delay={3} borderWidth={1} colorFrom="#59c0d6" colorTo="#008aab" />
        </div>

        {/* 5th Block (Naranja oscuro Aly): 🚨 SI ESTO NO FUNCIONA / CASOS ESPECIALES */}
        {hasSpecialCases && data.casosEspeciales && (
          <div
            id="card-casos-especiales-5to-bloque"
            className="md:col-span-2 relative bg-[#fcf3ec] border border-[#f4ddcb] rounded-xl border-l-[6px] border-l-[#d15e14] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="text-lg leading-none" role="img" aria-label="Alerta roja">
                🚨
              </span>
              <h3 className="text-[17px] font-bold text-[#8c3a0c] tracking-tight">
                <ScrambleText text={data.tituloCasosEspeciales || 'Si Esto No Funciona / Casos Especiales'} trigger={subcategory.id} />
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#fbe1cf] text-[#8c3a0c] uppercase tracking-wider ml-auto">
                <ScrambleText text="Casos Especiales" trigger={subcategory.id} />
              </span>
            </div>
            <ul className="space-y-2 text-[15px] text-slate-700 leading-relaxed pl-1">
              {data.casosEspeciales.map((caso, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#b34a12] text-lg leading-none select-none font-bold">
                    •
                  </span>
                  <ScrambleText text={caso} className="flex-1 font-medium" delay={idx * 45} trigger={subcategory.id} />
                </li>
              ))}
            </ul>
            <BorderBeam duration={6} borderWidth={1.5} colorFrom="#d15e14" colorTo="#ee7623" />
            <BorderBeam duration={6} delay={3} borderWidth={1} colorFrom="#ee7623" colorTo="#d15e14" />
          </div>
        )}
      </div>
    </div>
  );
};
