import * as THREE from 'three';
import { COLORS } from './Materials';

/**
 * Giant comic moon behind the hero so the silhouette pops. A glowing disc,
 * two ink rings and a scatter of halftone craters. Each frame it faces the
 * camera and gently pulses (see `update`).
 */
export class Moon {
  readonly group = new THREE.Group();

  constructor(perch: THREE.Vector3) {
    const moonDisc = new THREE.Mesh(
      new THREE.CircleGeometry(4.6, 48),
      new THREE.MeshBasicMaterial({ color: 0xffe9a8 }),
    );
    const moonRing = new THREE.Mesh(
      new THREE.RingGeometry(4.6, 4.78, 48),
      new THREE.MeshBasicMaterial({ color: COLORS.INK }),
    );
    const moonRing2 = new THREE.Mesh(
      new THREE.RingGeometry(5.1, 5.16, 48),
      new THREE.MeshBasicMaterial({ color: COLORS.INK, transparent: true, opacity: 0.35 }),
    );
    this.group.add(moonDisc, moonRing, moonRing2);

    // halftone craters
    for (let i = 0; i < 7; i++) {
      const cr = new THREE.Mesh(
        new THREE.CircleGeometry(0.22 + Math.random() * 0.4, 20),
        new THREE.MeshBasicMaterial({ color: 0xf3d67c }),
      );
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * 3.4;
      cr.position.set(Math.cos(a) * r, Math.sin(a) * r, 0.01);
      this.group.add(cr);
    }

    this.group.position.set(perch.x + 0.6, perch.y + 2.6, perch.z - 6.5);
  }

  /** Always face the camera + gentle pulse. */
  update(t: number, camera: THREE.Camera): void {
    this.group.lookAt(camera.position);
    const mp = 1 + Math.sin(t * 1.2) * 0.015;
    this.group.scale.set(mp, mp, mp);
  }

  addTo(scene: THREE.Scene): void {
    scene.add(this.group);
  }
}
