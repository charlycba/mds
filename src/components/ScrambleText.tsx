import React, { useLayoutEffect, useRef } from 'react';
import { animate, scrambleText } from 'animejs';

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  /** Cambia este valor para re-disparar la animacion aunque el texto sea igual. */
  trigger?: string | number;
}

/**
 * Revela el texto con un efecto de descifrado (anime.js scrambleText).
 * Se re-ejecuta cuando cambia `text`/`trigger` y respeta `prefers-reduced-motion`.
 *
 * Nota: el texto se inyecta con `dangerouslySetInnerHTML` para que React no
 * administre los nodos internos; anime.js los modifica en cada frame y, si React
 * los rastreara, el DOM se desincronizaria (dejando elementos sin desmontar).
 */
export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className,
  duration = 800,
  delay = 0,
  trigger,
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return;
    }

    try {
      const animation = animate(el, {
        innerHTML: scrambleText({ text, chars: 'a-zA-Z0-9', cursor: true, perturbation: 0.6 }),
        duration,
        delay,
      });
      return () => {
        animation.revert();
      };
    } catch (error) {
      // Si la animacion falla, dejamos el texto plano.
      el.textContent = text;
      console.error('[ScrambleText]', error);
      return;
    }
  }, [text, duration, delay, trigger]);

  return (
    <span
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
