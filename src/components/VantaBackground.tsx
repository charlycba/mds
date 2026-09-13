import React, { useEffect, useRef } from 'react';

interface VantaEffect {
  destroy: () => void;
}

type VantaFactory = (options: Record<string, unknown>) => VantaEffect;

/**
 * El paquete `vanta/dist/vanta.birds.min` es un UMD cuyo `module.exports` es
 * `{ default: factory }`. Segun como el bundler haga el interop, el default
 * puede llegar anidado una o dos veces. Esta funcion normaliza ambos casos.
 */
const resolveVantaFactory = (mod: unknown): VantaFactory | null => {
  const first = (mod as { default?: unknown })?.default ?? mod;
  const candidate =
    typeof first === 'function'
      ? first
      : (first as { default?: unknown })?.default;

  return typeof candidate === 'function' ? (candidate as VantaFactory) : null;
};

/**
 * Fondo animado con Vanta.js (efecto BIRDS).
 *
 * - Usa la paleta corporativa Aly (aves en degradado teal #00758d / naranja
 *   #ee7623 sobre #f7f9fa).
 * - Carga three.js y vanta de forma diferida (code-splitting) para no penalizar
 *   el bundle inicial.
 * - Se desactiva con `prefers-reduced-motion`.
 */
export const VantaBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<VantaEffect | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let cancelled = false;

    const loadEffect = async () => {
      try {
        const [three, vantaModule] = await Promise.all([
          import('three'),
          import('vanta/dist/vanta.birds.min'),
        ]);
        if (cancelled) return;

        const BIRDS = resolveVantaFactory(vantaModule);
        if (!BIRDS) return;
        effectRef.current = BIRDS({
          el,
          THREE: three,
          mouseControls: true,
          touchControls: false,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 1,
          backgroundColor: 0xf7f9fa,
          color1: 0x00758d,
          color2: 0xee7623,
          colorMode: 'varianceGradient',
          birdSize: 1,
          wingSpan: 30,
          speedLimit: 5,
          separation: 20,
          alignment: 20,
          cohesion: 20,
          quantity: 4,
        });
      } catch {
        // Si falla, se mantiene el fondo plano definido en el CSS.
      }
    };

    loadEffect();

    return () => {
      cancelled = true;
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 opacity-75"
    />
  );
};
