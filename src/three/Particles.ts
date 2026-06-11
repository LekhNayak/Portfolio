import * as THREE from 'three';
import { COLORS } from './Materials';

/**
 * V2 enhancement: a subtle field of drifting comic "ink dust" specks floating
 * over the skyline for extra atmospheric depth. Cheap (single Points object,
 * a few hundred vertices) so it never threatens the 60 FPS budget.
 */
export class Particles {
  readonly points: THREE.Points;
  private readonly count: number;
  private readonly attr: THREE.BufferAttribute;

  constructor(count = 150) {
    this.count = count;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = -42 + Math.random() * 84; // x across the city
      positions[i * 3 + 1] = -2 + Math.random() * 22; // y in the sky
      positions[i * 3 + 2] = -22 + Math.random() * 22; // z depth
    }
    const geo = new THREE.BufferGeometry();
    this.attr = new THREE.BufferAttribute(positions, 3);
    geo.setAttribute('position', this.attr);

    const mat = new THREE.PointsMaterial({
      color: COLORS.INK,
      size: 0.07,
      transparent: true,
      opacity: 0.28,
      sizeAttenuation: true,
      depthWrite: false,
    });
    this.points = new THREE.Points(geo, mat);
  }

  /** Gentle upward drift with wrap + a barely-there overall sway. */
  update(dt: number, t: number): void {
    const arr = this.attr.array as Float32Array;
    for (let i = 0; i < this.count; i++) {
      let y = arr[i * 3 + 1] + dt * 0.25;
      if (y > 20) y = -2;
      arr[i * 3 + 1] = y;
    }
    this.attr.needsUpdate = true;
    this.points.rotation.y = Math.sin(t * 0.05) * 0.02;
  }

  addTo(scene: THREE.Scene): void {
    scene.add(this.points);
  }
}
