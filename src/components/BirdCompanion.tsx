import React, { useEffect, useRef } from 'react';

const BIRD_WIDTH = 56;
const BIRD_HEIGHT = 46;

/**
 * Pajaro companero que vuela al boton presionado (categorias y subcategorias)
 * y se posa sobre su borde superior hasta que se presiona otro.
 *
 * Inspirado en la mecanica de oneko.js, pero con un pajaro SVG en la paleta Aly.
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
    const startX = 24;
    const startY = Math.max(24, window.innerHeight - BIRD_HEIGHT - 24);
    bird.style.transform = `translate3d(${startX}px, ${startY}px, 0)`;

    const flyTo = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const birdRect = bird.getBoundingClientRect();
      const start = { x: birdRect.left, y: birdRect.top };
      const targetX = rect.left + rect.width / 2 - BIRD_WIDTH / 2;
      const targetY = rect.top - BIRD_HEIGHT + 6;

      inner.style.transform = targetX < start.x ? 'scaleX(-1)' : 'scaleX(1)';

      const target = { x: targetX, y: targetY };

      if (reduceMotion) {
        bird.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
        return;
      }

      const dx = target.x - start.x;
      const dy = target.y - start.y;
      const dist = Math.hypot(dx, dy);
      const duration = Math.min(1600, Math.max(600, dist * 1.1));
      const midX = start.x + dx / 2;
      const midY = Math.min(start.y, target.y) - Math.max(60, Math.abs(dx) * 0.16);

      // Fijar la posicion actual como base y cancelar el vuelo anterior.
      bird.style.transform = `translate3d(${start.x}px, ${start.y}px, 0)`;
      animRef.current?.cancel();
      bird.classList.add('is-flying');

      const anim = bird.animate(
        [
          { transform: `translate3d(${start.x}px, ${start.y}px, 0)` },
          { transform: `translate3d(${midX}px, ${midY}px, 0)`, offset: 0.5 },
          { transform: `translate3d(${target.x}px, ${target.y}px, 0)` },
        ],
        { duration, easing: 'ease-in-out', fill: 'forwards' },
      );

      anim.onfinish = () => {
        bird.classList.remove('is-flying');
        bird.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      };
      animRef.current = anim;
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const button = target?.closest?.('.aly-cat-btn, .aly-galaxy-btn');
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
