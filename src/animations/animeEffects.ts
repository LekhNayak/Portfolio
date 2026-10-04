import { animate, createDrawable, spring, stagger, type JSAnimation } from 'animejs';
import { SCRAMBLE_CHARS } from './textScramble';

/**
 * anime.js micro-interactions. These sit on top of the GSAP scroll system and
 * only ever target elements GSAP does not own (inner SVGs, text
 * nodes, new decorative spans), so the two engines never fight over a property.
 *
 * Rule of thumb: never write an inline `transform` onto an element whose CSS
 * `:hover` uses `transform` — the inline style would win and kill the hover.
 * Animate a child instead.
 */

const randChar = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

/**
 * HUD-style decode: characters lock in left→right while the unresolved tail
 * flickers through the Spider-Verse scramble set. Mutates the element's single
 * text node in place (React keeps its reference to that node), so it is only
 * applied to elements whose sole child is text. Returns a cleanup that stops
 * the tween and restores the original text.
 */
export function decodeText(el: HTMLElement, duration = 900): () => void {
  const node = el.firstChild;
  if (!node || node.nodeType !== Node.TEXT_NODE || el.childNodes.length !== 1) return () => {};
  const original = node.nodeValue ?? '';
  const p = { v: 0 };
  const anim = animate(p, {
    v: original.length,
    duration,
    ease: 'outQuad',
    onUpdate: () => {
      const n = Math.floor(p.v);
      let tail = '';
      for (let i = n; i < original.length; i++) tail += original[i] === ' ' ? ' ' : randChar();
      node.nodeValue = original.slice(0, n) + tail;
    },
    onComplete: () => {
      node.nodeValue = original;
    },
  });
  return () => {
    anim.pause();
    node.nodeValue = original;
  };
}

/** Quick springy wiggle for small icons (achievement glyphs, social icons). */
export function wiggle(el: Element): JSAnimation {
  return animate(el, {
    rotate: [0, -16, 12, -6, 0],
    scale: [1, 1.25, 1],
    duration: 650,
    ease: 'outQuad',
    composition: 'replace',
  });
}

/** Pop a group of icons in with a bouncy spring, staggered. */
export function springIn(targets: Element[], delay = 0): JSAnimation {
  return animate(targets, {
    scale: { from: 0 },
    rotate: { from: -40 },
    delay: stagger(110, { start: delay }),
    ease: spring({ bounce: 0.55, duration: 700 }),
  });
}

/** Radar-ping rings: scale out from the node and fade. */
export function ripple(ring: HTMLElement, delay = 0): JSAnimation {
  return animate(ring, {
    scale: [1, 3.4],
    opacity: [0.85, 0],
    duration: 1100,
    delay,
    loop: 2,
    loopDelay: 250,
    ease: 'outExpo',
  });
}

/** Ink a stroked SVG in, line by line, like a pen going over pencils. */
export function drawStrokes(svg: SVGSVGElement, delay = 0): JSAnimation | null {
  const shapes = svg.querySelectorAll<SVGGeometryElement>('path, rect, line, polyline, circle');
  if (!shapes.length) return null;
  return animate(createDrawable(shapes), {
    draw: ['0 0', '0 1'],
    duration: 700,
    delay: stagger(140, { start: delay }),
    ease: 'inOutQuad',
  });
}

/**
 * Stagger the contents of a card's freshly revealed back face. Waits for the
 * CSS flip to pass its midpoint (`delay`) so the motion happens on the visible
 * face. Only opacity + translate are written, on elements with no CSS
 * transforms of their own.
 */
export function revealBackFace(items: Element[], delay = 260): JSAnimation | null {
  if (!items.length) return null;
  return animate(items, {
    opacity: { from: 0 },
    y: { from: 14 },
    delay: stagger(70, { start: delay }),
    duration: 520,
    ease: 'outBack(1.4)',
  });
}

/** Chip-burst for small tag pills: pop from nothing with a spring. */
export function popChips(items: Element[], delay = 0): JSAnimation | null {
  if (!items.length) return null;
  return animate(items, {
    scale: { from: 0.3 },
    opacity: { from: 0 },
    delay: stagger(60, { start: delay, from: 'first' }),
    ease: spring({ bounce: 0.5, duration: 600 }),
  });
}

/** Navbar links drop in one after another as the bar slides down. */
export function dropIn(items: Element[]): JSAnimation | null {
  if (!items.length) return null;
  return animate(items, {
    y: { from: -18 },
    opacity: { from: 0 },
    delay: stagger(55, { start: 120 }),
    duration: 500,
    ease: 'outBack(1.8)',
  });
}
