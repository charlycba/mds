import React from 'react';

interface BorderBeamProps {
  className?: string;
  /** Compatibilidad con la API de MagicUI (en esta implementacion CSS no se usa). */
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
}

/**
 * Haz de luz animado que recorre el borde del contenedor.
 * Implementacion CSS (sin `motion`) del efecto BorderBeam de MagicUI,
 * adaptada para respetar la paleta de colores de cada card.
 */
export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = '',
  duration = 6,
  delay = 0,
  colorFrom = '#ee7623',
  colorTo = '#f6a35e',
  borderWidth = 1.5,
}) => {
  return (
    <div
      aria-hidden="true"
      className={`aly-border-beam ${className}`}
      style={
        {
          '--beam-color-from': colorFrom,
          '--beam-color-to': colorTo,
          '--beam-duration': `${duration}s`,
          '--beam-delay': `${-delay}s`,
          '--beam-width': `${borderWidth}px`,
        } as React.CSSProperties
      }
    />
  );
};
