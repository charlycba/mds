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
 * Pajaro companero.
 * - Vuela al boton presionado (categorias y subcategorias) y se posa en su borde.
 * - Al hacer click sobre el, vuela a la derecha del buscador y se queda quieto
 *   pegado a la parte inferior del header. Al tocarlo ahi aletea y queda listo
 *   para volver a interactuar con los botones.
 */
export const BirdCompanion: React.FC = () => {
  const birdRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const idleTimerRef = useRef<number | undefined>(undefined);
  const behaviorTimerRef = useRef<number | undefined>(undefined);
  const flapTimerRef = useRef<number | undefined>(undefined);
  const currentButtonRef = useRef<HTMLElement | null>(null);
  const dockedRef = useRef(false);
  const positionModeRef = useRef<'free' | 'header' | 'button'>('free');
  const perchRatioRef = useRef(0.5);

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

    const faceTowards = (fromX: number, toX: number) => {
      inner.style.transform = toX < fromX ? 'scaleX(-1)' : 'scaleX(1)';
    };

    // Posicion destino sobre el header (a la derecha del buscador, abajo).
    const headerTarget = () => {
      const header = document.querySelector('header');
      if (!header) return null;
      const hRect = header.getBoundingClientRect();
      const search = document.getElementById('input-global-search');
      const { scrollX, scrollY } = docCoords();
      const desiredX = search
        ? search.getBoundingClientRect().right + scrollX + 12
        : hRect.right + scrollX - BIRD_WIDTH - 12;
      return {
        x: Math.min(desiredX, hRect.right + scrollX - BIRD_WIDTH - 8),
        y: hRect.bottom + scrollY - BIRD_HEIGHT + 6,
      };
    };

    // Reajusta la posicion tras un zoom/resize sin animar (queda donde estaba).
    const reposition = () => {
      if (bird.classList.contains('is-flying') || bird.classList.contains('is-busy')) return;
      if (positionModeRef.current === 'header') {
        const target = headerTarget();
        if (target) bird.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      } else if (positionModeRef.current === 'button' && currentButtonRef.current) {
        const { scrollX, scrollY } = docCoords();
        const rect = currentButtonRef.current.getBoundingClientRect();
        const x = rect.left + scrollX + perchRatioRef.current * rect.width - BIRD_WIDTH / 2;
        const y = rect.top + scrollY - BIRD_HEIGHT + 6;
        bird.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const clearBehaviorClasses = () => {
      bird.classList.remove('is-busy', 'is-walking', 'is-sitting', 'is-jumping', 'is-flapping');
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

      faceTowards(start.x, target.x);
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
        anim.cancel();
        // Guardar la posicion relativa dentro del boton para conservarla al zoom.
        const r = el.getBoundingClientRect();
        const { scrollX } = docCoords();
        perchRatioRef.current = Math.min(
          1,
          Math.max(0, (target.x + BIRD_WIDTH / 2 - (r.left + scrollX)) / r.width),
        );
        clearBehaviorClasses();
        scheduleNextBehavior();
      };
      animRef.current = anim;
    };

    const animateFlight = (
      start: { x: number; y: number },
      target: { x: number; y: number },
      onArrive: () => void,
    ) => {
      if (reduceMotion) {
        bird.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
        onArrive();
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
        bird.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
        anim.cancel();
        onArrive();
      };
      animRef.current = anim;
    };

    const flyTo = (el: HTMLElement) => {
      clearIdle();
      currentButtonRef.current = el;
      dockedRef.current = false;
      positionModeRef.current = 'button';
      perchRatioRef.current = 0.5;
      bird.classList.remove('is-perched', 'is-docked');

      const { scrollX, scrollY } = docCoords();
      const rect = el.getBoundingClientRect();
      const start = currentPosition();
      const target = {
        x: rect.left + scrollX + rect.width / 2 - BIRD_WIDTH / 2,
        y: rect.top + scrollY - BIRD_HEIGHT + 6,
      };
      faceTowards(start.x, target.x);

      animateFlight(start, target, () => {
        bird.classList.add('is-perched');
        scheduleNextBehavior();
      });
    };

    const dockToHeader = () => {
      clearIdle();
      currentButtonRef.current = null;
      dockedRef.current = true;
      positionModeRef.current = 'header';
      bird.classList.remove('is-perched', 'is-docked');

      const start = currentPosition();
      const target = headerTarget() ?? start;
      faceTowards(start.x, target.x);

      animateFlight(start, target, () => {
        bird.classList.add('is-docked');
      });
    };

    // Al cargar la pagina el pajaro arranca desactivado, posado en el header.
    const startDocked = () => {
      const target = headerTarget();
      if (!target) return;
      bird.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      dockedRef.current = true;
      positionModeRef.current = 'header';
      bird.classList.remove('is-perched', 'is-flying');
      bird.classList.add('is-docked');
    };
    startDocked();

    const onBirdClick = (event: Event) => {
      event.stopPropagation();
      if (dockedRef.current) {
        // Tocarlo en el header: aletea y queda listo para los botones.
        window.clearTimeout(flapTimerRef.current);
        bird.classList.add('is-flapping');
        flapTimerRef.current = window.setTimeout(() => {
          bird.classList.remove('is-flapping', 'is-docked');
          dockedRef.current = false;
        }, 1100);
      } else {
        dockToHeader();
      }
    };

    const onBirdKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onBirdClick(event);
      }
    };

    const onClick = (event: MouseEvent) => {
      if (dockedRef.current) return;
      const target = event.target as HTMLElement | null;
      const button = target?.closest?.(BUTTON_SELECTOR);
      if (button instanceof HTMLElement) {
        flyTo(button);
      }
    };

    bird.addEventListener('click', onBirdClick);
    bird.addEventListener('keydown', onBirdKey);
    document.addEventListener('click', onClick, true);
    window.addEventListener('resize', reposition);
    window.visualViewport?.addEventListener('resize', reposition);

    return () => {
      bird.removeEventListener('click', onBirdClick);
      bird.removeEventListener('keydown', onBirdKey);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('resize', reposition);
      window.visualViewport?.removeEventListener('resize', reposition);
      clearIdle();
      if (flapTimerRef.current) window.clearTimeout(flapTimerRef.current);
      animRef.current?.cancel();
    };
  }, []);

  return (
    <div
      ref={birdRef}
      className="aly-bird"
      role="button"
      tabIndex={0}
      aria-label="Pájaro compañero"
    >
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
