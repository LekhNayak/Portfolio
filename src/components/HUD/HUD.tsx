import { useEffect, useRef } from 'react';
import { useSceneBindings } from '@/context/SceneBindingsContext';
import styles from './HUD.module.scss';

/**
 * Corner HUD readouts. The WEB-FIRED value is written every frame by the render
 * loop, the SCROLL value by the scroll hook — both imperatively via the shared
 * bindings, so the HUD itself never re-renders.
 */
export function HUD() {
  const webRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLElement>(null);
  const bindings = useSceneBindings();

  useEffect(() => {
    bindings.current.hudWeb = webRef.current;
    bindings.current.hudScroll = scrollRef.current;
    return () => {
      if (bindings.current) {
        bindings.current.hudWeb = null;
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
        WEB FIRED <b ref={webRef}>000%</b>
        <br />
        SCROLL <b ref={scrollRef}>000%</b>
      </div>
    </>
  );
}
