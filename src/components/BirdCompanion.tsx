import React, { useEffect, useRef } from 'react';

const BIRD_WIDTH = 56;
const BIRD_HEIGHT = 46;

const BUTTON_SELECTOR =
  '#categories-navigation .aly-cat-btn, #subcategories-navigation .aly-galaxy-btn';

/** Comportamientos posados (clase CSS + duracion en ms). */
const POSED_BEHAVIORS: { className: string; duration: number }[] = [
  { className: 'is-sitting', duration: 2200 }, // sentarse
  { className: 'is-jumping', duration: 950 }, // saltar
  { className: 'is-flapping', duration: 1400 }, // aleteo
];

/**
 * Pajaro companero que vuela al boton presionado (categorias y subcategorias)
 * y se posa sobre su borde superior. Una vez posado, a los >=3s realiza
 * comportamientos aleatorios: caminar por el borde, ponerse de frente, sentarse,
 * saltar, aletear o comer.
 */
export const BirdCompanion: React.FC = () => {
  const birdRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const idleTimerRef = useRef<number | undefined>(undefined);
  const behaviorTimerRef = useRef<number | undefined>(undefined);
  const currentButtonRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const bird = birdRef.current;
    const inner = innerRef.current;
    if (!bird || !inner) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initialX = 24;
    const initialY = window.scrollY + window.innerHeight - BIRD_HEIGHT - 24;
    bird.style.transform = `translate3d(${initialX}px, ${initialY}px, 0)`;

    const docCoords = () => ({ scrollX: window.scrollX, scrollY: window.scrollY });

    const currentPosition = () => {
      const r = bird.getBoundingClientRect();
      const { scrollX, scrollY } = docCoords();
      return { x: r.left + scrollX, y: r.top + scrollY };
    };

    const clearBehaviorClasses = () => {
      bird.classList.remove(
        'is-busy',
        'is-walking',
        'is-sitting',
        'is-jumping',
        'is-flapping',
      );
    };

    const clearIdle = () => {
      if (idleTimerRef.current) window.clearTimeout(idleTimerRef.current);
      if (behaviorTimerRef.current) window.clearTimeout(behaviorTimerRef.current);
      idleTimerRef.current = undefined;
      behaviorTimerRef.current = undefined;
      clearBehaviorClasses();
    };

    const scheduleNextBehavior = () => {
      idleTimerRef.current = window.setTimeout(runRandomBehavior, 3000 + Math.random() * 3000);
    };

    const runRandomBehavior = () => {
      clearBehaviorClasses();
      bird.classList.add('is-busy');

      // 1 de cada 6 veces camina por el borde; el resto, comportamiento aleatorio.
      if (Math.random() < 1 / 6) {
        walk();
        return;
      }

      const pick = POSED_BEHAVIORS[Math.floor(Math.random() * POSED_BEHAVIORS.length)];
      bird.classList.add(pick.className);
      behaviorTimerRef.current = window.setTimeout(() => {
        clearBehaviorClasses();
        scheduleNextBehavior();
      }, pick.duration);
    };

    const walk = () => {
      const el = currentButtonRef.current;
      if (!el) {
        clearBehaviorClasses();
        scheduleNextBehavior();
        return;
      }
      const { scrollX, scrollY } = docCoords();
      const rect = el.getBoundingClientRect();
      const start = currentPosition();
      const minX = rect.left + scrollX + 6;
      const maxX = rect.left + scrollX + rect.width - BIRD_WIDTH - 6;
      const targetX = minX + Math.random() * Math.max(1, maxX - minX);
      const target = { x: targetX, y: start.y };

      inner.style.transform = target.x < start.x ? 'scaleX(-1)' : 'scaleX(1)';
      bird.classList.add('is-walking');
      bird.style.transform = `translate3d(${start.x}px, ${start.y}px, 0)`;
      animRef.current?.cancel();

      const duration = 800 + Math.abs(target.x - start.x) * 6;
      const anim = bird.animate(
        [
          { transform: `translate3d(${start.x}px, ${start.y}px, 0)` },
          { transform: `translate3d(${target.x}px, ${target.y}px, 0)` },
        ],
        { duration, easing: 'ease-in-out', fill: 'forwards' },
      );
      anim.onfinish = () => {
        bird.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
        clearBehaviorClasses();
        scheduleNextBehavior();
      };
      animRef.current = anim;
    };

    const flyTo = (el: HTMLElement) => {
      clearIdle();
      currentButtonRef.current = el;
      bird.classList.remove('is-perched');

      const { scrollX, scrollY } = docCoords();
      const rect = el.getBoundingClientRect();
      const start = currentPosition();
      const target = {
        x: rect.left + scrollX + rect.width / 2 - BIRD_WIDTH / 2,
        y: rect.top + scrollY - BIRD_HEIGHT + 6,
      };

      inner.style.transform = target.x < start.x ? 'scaleX(-1)' : 'scaleX(1)';

      if (reduceMotion) {
        bird.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
        bird.classList.add('is-perched');
        scheduleNextBehavior();
        return;
      }

      const dx = target.x - start.x;
      const dy = target.y - start.y;
      const dist = Math.hypot(dx, dy) || 1;
      const duration = 1800 + Math.random() * 1500 + Math.min(1200, dist * 0.6);
      const amplitude = Math.max(16, Math.min(95, dist * (0.08 + Math.random() * 0.1)));
      const perpX = -dy / dist;
      const perpY = dx / dist;

      const segments = 5;
      const keyframes: Keyframe[] = [];
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const env = Math.sin(Math.PI * t);
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

      bird.style.transform = `translate3d(${start.x}px, ${start.y}px, 0)`;
      animRef.current?.cancel();
      bird.classList.add('is-flying');

      const anim = bird.animate(keyframes, { duration, easing: 'ease-in-out', fill: 'forwards' });
      anim.onfinish = () => {
        bird.classList.remove('is-flying');
        bird.classList.add('is-perched');
        bird.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
        scheduleNextBehavior();
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
      clearIdle();
      animRef.current?.cancel();
    };
  }, []);

  return (
    <div ref={birdRef} className="aly-bird" aria-hidden="true">
      <div ref={innerRef} className="aly-bird__inner">
        <div className="aly-bird__pose">
          <svg className="aly-bird__svg" viewBox="0 0 64 52" xmlns="http://www.w3.org/2000/svg">
            <g className="aly-bird__feet" stroke="#ee7623" strokeWidth="2" strokeLinecap="round">
              <g className="aly-bird__leg aly-bird__leg--left">
                <line x1="29" y1="40" x2="27" y2="48" />
                <line x1="24" y1="48" x2="30" y2="48" />
              </g>
              <g className="aly-bird__leg aly-bird__leg--right">
                <line x1="36" y1="40" x2="38" y2="48" />
                <line x1="35" y1="48" x2="41" y2="48" />
              </g>
            </g>
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
    </div>
  );
};
