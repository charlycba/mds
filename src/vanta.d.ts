declare module 'vanta/dist/vanta.birds.min' {
  export interface VantaEffectInstance {
    destroy: () => void;
    pause?: () => void;
    play?: () => void;
  }

  const BIRDS: (
    options: Record<string, unknown>,
  ) => VantaEffectInstance;

  export default BIRDS;
}
