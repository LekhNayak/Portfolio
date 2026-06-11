import { createContext, useContext, useRef, type ReactNode, type RefObject } from 'react';
import type { SceneManager } from '@/three/SceneManager';

/**
 * A tiny mutable bridge between the imperative WebGL/scroll layer and the
 * declarative React tree. The render loop and the scroll handler write to
 * these DOM nodes ~60fps WITHOUT triggering React re-renders (mirroring the
 * original `document.getElementById(...).textContent = ...` approach).
 *
 * Everything is funnelled through one mutable ref object so there are no
 * mount-ordering hazards between <Scene>, <HUD> and <ProgressBar>.
 */
export interface SceneBindings {
  manager: SceneManager | null;
  /** <i> inside the top progress bar. */
  progressFill: HTMLElement | null;
  /** <b> showing scroll percentage in the HUD. */
  hudScroll: HTMLElement | null;
  /** <b> showing web-fired percentage in the HUD. */
  hudWeb: HTMLElement | null;
}

const SceneBindingsCtx = createContext<RefObject<SceneBindings> | null>(null);

export function SceneBindingsProvider({ children }: { children: ReactNode }) {
  const ref = useRef<SceneBindings>({
    manager: null,
    progressFill: null,
    hudScroll: null,
    hudWeb: null,
  });
  return <SceneBindingsCtx.Provider value={ref}>{children}</SceneBindingsCtx.Provider>;
}

export function useSceneBindings(): RefObject<SceneBindings> {
  const ctx = useContext(SceneBindingsCtx);
  if (!ctx) throw new Error('useSceneBindings must be used within <SceneBindingsProvider>');
  return ctx;
}
