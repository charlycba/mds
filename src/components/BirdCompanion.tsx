import React, { useEffect, useRef } from 'react';

const BIRD_WIDTH = 56;
const BIRD_HEIGHT = 46;

const BUTTON_SELECTOR =
  '#categories-navigation .aly-cat-btn, #subcategories-navigation .aly-galaxy-btn';

/**
 * Pajaro companero que vuela al boton presionado (categorias y subcategorias)
 * y se posa sobre su borde superior hasta que se presiona otro.
 *
 * - Posicionamiento absoluto en el documento: acompana el scroll y se mantiene
 *   sobre el boton seleccionado.
 * - Vuelo con trayectoria y duracion aleatorias (nada predecible) y aterrizaje suave.
 */
export const BirdCompanion: React.FC = () => {
  const birdRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);

  useEffect(() => {
    const bird = birdRef.current;
    const inner = innerRef.current;
    if (!bird || !inner) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initialX = 24;
    const initialY = window.scrollY + window.innerHeight - BIRD_HEIGHT - 24;
    bird.style.transform = `translate3d(${initialX}px, ${initialY}px, 0)`;

    const flyTo = (el: HTMLElement) => {
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const rect = el.getBoundingClientRect();
      const birdRect = bird.getBoundingClientRect();

      const start = { x: birdRect.left + scrollX, y: birdRect.top + scrollY };
      const target = {
        x: rect.left + scrollX + rect.width / 2 - BIRD_WIDTH / 2,
        y: rect.top + scrollY - BIRD_HEIGHT + 6,
      };

      inner.style.transform = target.x < start.x ? 'scaleX(-1)' : 'scaleX(1)';

      if (reduceMotion) {
        bird.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
        return;
      }

      const dx = target.x - start.x;
      const dy = target.y - start.y;
      const dist = Math.hypot(dx, dy) || 1;

      // Duracion lenta y aleatoria, con algo de dependencia de la distancia.
      const duration = 1800 + Math.random() * 1500 + Math.min(1200, dist * 0.6);

      // Amplitud del zigzagueo aleatorio, proporcional a la distancia.
      const amplitude = Math.max(16, Math.min(95, dist * (0.08 + Math.random() * 0.1)));

      // Base perpendicular a la recta origen->destino para desviar el vuelo.
      const perpX = -dy / dist;
      const perpY = dx / dist;

      const segments = 5;
      const keyframes: Keyframe[] = [];
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const env = Math.sin(Math.PI * t); // 0 en los extremos, 1 en el centro
        const off = (Math.random() * 2 - 1) * amplitude * env;
        const wobble = (Math.random() * 2 - 1) * amplitude * 0.5 * env;
        const rot = (Math.random() * 2 - 1) * 9 * env;
        keyframes.push({
          offset: t,
          transform: `translate3d(${start.x + dx * t + perpX * off}px, ${
            start.y + dy * t + perpY * off + wobble
          }px, 0) rotate(${rot}deg)`,
        });
      }
      keyframes[0].transform = `translate3d(${start.x}px, ${start.y}px, 0)`;
      keyframes[segments].transform = `translate3d(${target.x}px, ${target.y}px, 0)`;

      // Fijar la posicion actual como base y cancelar el vuelo anterior.
      bird.style.transform = `translate3d(${start.x}px, ${start.y}px, 0)`;
      animRef.current?.cancel();
      bird.classList.add('is-flying');

      const anim = bird.animate(keyframes, {
        duration,
        easing: 'ease-in-out',
        fill: 'forwards',
      });

      anim.onfinish = () => {
        bird.classList.remove('is-flying');
        bird.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      };
      animRef.current = anim;
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest?.(BUTTON_SELECTOR);
      if (button instanceof HTMLElement) {
        flyTo(button);
      }
    };

    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('click', onClick, true);
      animRef.current?.cancel();
    };
  }, []);

  return (
    <div ref={birdRef} className="aly-bird" aria-hidden="true">
      <div ref={innerRef} className="aly-bird__inner">
        <svg className="aly-bird__svg" viewBox="0 0 64 52" xmlns="http://www.w3.org/2000/svg">
          <g className="aly-bird__body">
            <ellipse
              className="aly-bird__wing aly-bird__wing--far"
              cx="30"
              cy="26"
              rx="14"
              ry="6.5"
              fill="#00697d"
            />
            <polygon points="20,30 6,21 10,36" fill="#00bed6" />
            <ellipse cx="33" cy="32" rx="15" ry="10" fill="#00758d" />
            <circle cx="46" cy="24" r="7.5" fill="#008aab" />
            <polygon points="53,23 63,25 53,27" fill="#ee7623" />
            <circle cx="48.5" cy="22" r="1.7" fill="#0b2027" />
            <circle cx="49" cy="21.4" r="0.6" fill="#ffffff" />
            <ellipse
              className="aly-bird__wing aly-bird__wing--near"
              cx="30"
              cy="29"
              rx="14"
              ry="7"
              fill="#00bed6"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};
