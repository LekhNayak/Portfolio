import { useEffect, useRef } from 'react';
import { useSceneBindings } from '@/context/SceneBindingsContext';
import styles from './HUD.module.scss';

/**
 * Corner HUD readouts. The SCROLL value is written by the scroll hook
 * imperatively via the shared bindings, so the HUD itself never re-renders.
 */
export function HUD() {
  const scrollRef = useRef<HTMLElement>(null);
  const bindings = useSceneBindings();

  useEffect(() => {
    bindings.current.hudScroll = scrollRef.current;
    return () => {
      if (bindings.current) {
        bindings.current.hudScroll = null;
      }
    };
  }, [bindings]);

  return (
    <>
      <div className={`${styles.hud} ${styles.tl}`} aria-hidden="true">
        SYS // <b>LEKH.DEV</b>
        <br />
        NODE: MUMBAI-IN
      </div>
      <div className={`${styles.hud} ${styles.br}`} aria-hidden="true">
        SCROLL <b ref={scrollRef}>000%</b>
      </div>
    </>
  );
}
