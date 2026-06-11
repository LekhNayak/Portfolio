import { useEffect, useRef } from 'react';
import { SceneManager } from '@/three/SceneManager';
import { useSceneBindings } from '@/context/SceneBindingsContext';
import styles from './Scene.module.scss';

interface SceneProps {
  /** True once the loader sequence finishes — starts the loop + camera intro. */
  loaded: boolean;
  reduceMotion: boolean;
}

/**
 * Mounts the WebGL canvas and owns the lifecycle of the `SceneManager`
 * (construction, intro trigger, full GPU disposal). The manager is published
 * onto the shared bindings so the scroll hook can feed it scroll progress.
 */
export function Scene({ loaded, reduceMotion }: SceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const managerRef = useRef<SceneManager | null>(null);
  const bindings = useSceneBindings();

  useEffect(() => {
    if (!canvasRef.current) return;
    const manager = new SceneManager(canvasRef.current, reduceMotion, bindings);
    managerRef.current = manager;
    bindings.current.manager = manager;
    return () => {
      manager.dispose();
      managerRef.current = null;
      if (bindings.current) bindings.current.manager = null;
    };
  }, [reduceMotion, bindings]);

  useEffect(() => {
    if (!loaded) return;
    const manager = managerRef.current;
    if (!manager) return;
    manager.start();
    manager.playIntro();
  }, [loaded]);

  return <canvas ref={canvasRef} className={styles.gl} aria-hidden="true" />;
}
