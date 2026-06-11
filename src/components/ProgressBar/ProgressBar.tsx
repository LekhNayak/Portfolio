import { useEffect, useRef } from 'react';
import { useSceneBindings } from '@/context/SceneBindingsContext';
import styles from './ProgressBar.module.scss';

/**
 * Top scroll-progress bar. Its fill element is registered on the shared
 * bindings so `useScrollProgress` can update its width imperatively (no
 * per-scroll React re-render).
 */
export function ProgressBar() {
  const fillRef = useRef<HTMLElement>(null);
  const bindings = useSceneBindings();

  useEffect(() => {
    bindings.current.progressFill = fillRef.current;
    return () => {
      if (bindings.current) bindings.current.progressFill = null;
    };
  }, [bindings]);

  return (
    <div className={styles.progress} aria-hidden="true">
      <i ref={fillRef} className={styles.fill} />
    </div>
  );
}
