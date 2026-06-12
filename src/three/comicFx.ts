import gsap from 'gsap';

const WORDS = ['THWACK!', 'BAM!', 'ZAP!', 'GOTCHA!', 'SNAP!', 'FAAAH!'] as const;

/**
 * Pops a comic word-burst (spiky star + onomatopoeia) at a screen position.
 * Element is appended to <body>, animated with GSAP, then self-removes.
 */
export function comicBurst(x: number, y: number): void {
  const el = document.createElement('div');
  el.className = 'burst';
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const col = Math.random() < 0.5 ? '#E0202F' : '#2342D6';
  el.innerHTML = `<svg viewBox="0 0 100 100"><polygon points="50,2 58,30 88,12 70,38 98,46 70,56 86,84 56,68 50,98 42,68 14,86 30,56 2,48 30,40 12,12 42,30" fill="${col}" stroke="#15151C" stroke-width="3"/></svg><b>${word}</b>`;
  document.body.appendChild(el);
  gsap.fromTo(el, { scale: 0, rotate: -20 }, { scale: 1, rotate: 6, duration: 0.35, ease: 'back.out(3)' });
  gsap.to(el, { scale: 0, opacity: 0, duration: 0.3, delay: 0.55, ease: 'back.in(2)', onComplete: () => el.remove() });
}

/** Draws a spider-web splat (spokes + concentric rings) at a screen position. */
export function webSplat(x: number, y: number): void {
  const el = document.createElement('div');
  el.className = 'websplat';
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  let spokes = '';
  let rings = '';
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    spokes += `<line x1="60" y1="60" x2="${60 + Math.cos(a) * 56}" y2="${60 + Math.sin(a) * 56}"/>`;
  }
  for (let r = 14; r <= 52; r += 13) {
    let d = '';
    for (let i = 0; i <= 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      d += (i === 0 ? 'M' : 'L') + (60 + Math.cos(a) * r) + ',' + (60 + Math.sin(a) * r);
    }
    rings += `<path d="${d}Z" fill="none"/>`;
  }
  el.innerHTML = `<svg width="120" height="120" viewBox="0 0 120 120" stroke="#15151C" stroke-width="1.6" opacity=".75">${spokes}${rings}</svg>`;
  document.body.appendChild(el);
  gsap.fromTo(
    el,
    { scale: 0.2, opacity: 1, rotate: Math.random() * 40 - 20 },
    { scale: 1, duration: 0.3, ease: 'back.out(2)' },
  );
  gsap.to(el, { opacity: 0, scale: 1.15, duration: 0.6, delay: 0.5, onComplete: () => el.remove() });
}
