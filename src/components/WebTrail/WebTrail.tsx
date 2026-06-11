import { useEffect, useRef } from 'react';
import styles from './WebTrail.module.scss';

interface WebTrailProps {
  enabled: boolean;
}

/**
 * Canvas web-trail that follows the cursor: a fading red strand built from the
 * last 26 pointer samples, with faint ink cross-strands every 5th segment for
 * the spider-web look. Disabled on touch / reduced motion.
 */
export function WebTrail({ enabled }: WebTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    size();
    window.addEventListener('resize', size);

    const trail: Array<{ x: number; y: number }> = [];
    const onMove = (e: PointerEvent) => {
      trail.unshift({ x: e.clientX, y: e.clientY });
      if (trail.length > 26) trail.pop();
    };
    window.addEventListener('pointermove', onMove);

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (trail.length > 2) {
        for (let i = 1; i < trail.length; i++) {
          const f = 1 - i / trail.length;
          ctx.strokeStyle = `rgba(224,32,47,${f * 0.5})`;
          ctx.lineWidth = f * 3;
          ctx.beginPath();
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
          ctx.lineTo(trail[i].x, trail[i].y);
          ctx.stroke();
          if (i % 5 === 0) {
            ctx.strokeStyle = `rgba(21,21,28,${f * 0.3})`;
            ctx.lineWidth = 1;
            const dx = trail[i].x - trail[i - 1].x;
            const dy = trail[i].y - trail[i - 1].y;
            const L = Math.hypot(dx, dy) || 1;
            const nx = (-dy / L) * 7 * f;
            const ny = (dx / L) * 7 * f;
            ctx.beginPath();
            ctx.moveTo(trail[i].x - nx, trail[i].y - ny);
            ctx.lineTo(trail[i].x + nx, trail[i].y + ny);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', size);
      window.removeEventListener('pointermove', onMove);
    };
  }, [enabled]);

  return <canvas ref={canvasRef} className={styles.trail} aria-hidden="true" />;
}
