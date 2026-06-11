import * as THREE from 'three';
import { COLORS } from './Materials';

interface CloudData {
  sp: number;
}

/**
 * A handful of procedural comic clouds (clustered spheres with faint ink
 * outlines) that drift slowly to the right and wrap around.
 */
export class Clouds {
  readonly group = new THREE.Group();

  constructor(count = 6) {
    for (let i = 0; i < count; i++) {
      const cg = new THREE.Group();
      for (let b = 0; b < 4; b++) {
        const s = new THREE.Mesh(
          new THREE.SphereGeometry(0.7 + Math.random() * 0.5, 10, 10),
          new THREE.MeshBasicMaterial({ color: 0xffffff }),
        );
        s.position.set(b * 0.9 - 1.3, Math.random() * 0.3, 0);
        cg.add(s);
        const o = new THREE.LineSegments(
          new THREE.EdgesGeometry(s.geometry),
          new THREE.LineBasicMaterial({ color: COLORS.INK, transparent: true, opacity: 0.12 }),
        );
        o.position.copy(s.position);
        cg.add(o);
      }
      cg.position.set(-16 + i * 6.5, 6 + Math.random() * 3.5, -9 - Math.random() * 5);
      cg.userData = { sp: 0.08 + Math.random() * 0.12 } satisfies CloudData;
      this.group.add(cg);
    }
  }

  /** Drift right; wrap once past the edge. */
  update(dt: number): void {
    this.group.children.forEach((c) => {
      const data = c.userData as CloudData;
      c.position.x += data.sp * dt;
      if (c.position.x > 22) c.position.x = -22;
    });
  }

  addTo(scene: THREE.Scene): void {
    scene.add(this.group);
  }
}
