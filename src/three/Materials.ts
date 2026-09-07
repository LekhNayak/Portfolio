import * as THREE from 'three';

/**
 * Palette used inside the WebGL scene. These mirror the comic CSS tokens but
 * are kept as numeric hex so Three.js materials can consume them directly.
 * (Note: the scene's YELLOW is intentionally the deeper 0xE8A800 used in the
 * original implementation, not the UI --yellow.)
 */
export const COLORS = {
  INK: 0x15151c,
  RED: 0xe0202f,
  BLUE: 0x2342d6,
  YELLOW: 0xe8a800,
  PAPER: 0xf1ead6,
} as const;

/** Flat ink material shared by every hero-silhouette primitive. */
export function createInkMaterial(): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ color: COLORS.INK });
}

/**
 * Procedurally paints a comic "lit windows" canvas texture for a building.
 * Most windows are dark ink, ~28% glow comic-yellow. The repeat is derived
 * from the building footprint exactly as in the original source.
 */
export function windowTexture(w: number, h: number): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 128;
  const x = c.getContext('2d')!;
  x.fillStyle = '#EFEBDE';
  x.fillRect(0, 0, 64, 128);
  x.fillStyle = 'rgba(21,21,28,.8)';
  for (let r = 8; r < 124; r += 14) {
    for (let col = 8; col < 60; col += 14) {
      if (Math.random() < 0.72) {
        x.fillRect(col, r, 7, 8);
      } else {
        x.fillStyle = 'rgba(255,196,0,.9)';
        x.fillRect(col, r, 7, 8);
        x.fillStyle = 'rgba(21,21,28,.8)';
      }
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.repeat.set(Math.max(1, Math.round(w / 1.4)), Math.max(1, Math.round(h / 2.4)));
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}
