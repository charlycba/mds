import React, { useEffect, useRef } from 'react';
import { animate, scrambleText } from 'animejs';

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

/**
 * Revela el texto con un efecto de descifrado (anime.js scrambleText).
 * Se re-ejecuta cuando cambia `text` y respeta `prefers-reduced-motion`.
 */
export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className,
  duration = 800,
  delay = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = text;
      return;
    }

    el.textContent = text;
    const animation = animate(el, {
      innerHTML: scrambleText({ chars: 'a-zA-Z0-9', cursor: true, perturbation: 0.6 }),
      duration,
      delay,
    });

    return () => {
      animation.revert();
    };
  }, [text, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
};
