import * as THREE from 'three';
import { createInkMaterial } from './Materials';

/**
 * The crouched, web-firing hero — a pure ink silhouette assembled from
 * primitive geometry, placed on the rooftop corner of his tower and turned so
 * the firing arm points left across the skyline.
 *
 * The render loop animates idle breathing + slight sway + mouse responsiveness
 * (see `SceneManager`). `handWorld()` recomputes the firing hand position in
 * world space each frame — the web strand originates there.
 */
export class HeroSilhouette {
  readonly group = new THREE.Group();
  readonly perch: THREE.Vector3;
  /** Turned so the firing arm points left across the skyline. */
  readonly baseRotY = 2.75;

  private readonly mat = createInkMaterial();
  private readonly handLocal = new THREE.Vector3(0.98, 1.62, 0.05);

  constructor(heroBuilding: THREE.Mesh, heroBH: number) {
    this.buildBody();
    this.group.scale.setScalar(2.2);

    // place hero on rooftop corner of his tower, facing LEFT across the city
    this.perch = new THREE.Vector3(
      heroBuilding.position.x - 0.4,
      heroBuilding.position.y + heroBH / 2 + 0.25,
      heroBuilding.position.z + 1.2,
    );
    this.group.position.copy(this.perch);
    this.group.rotation.y = this.baseRotY;
  }

  private part(
    geom: THREE.BufferGeometry,
    x: number,
    y: number,
    z: number,
    rx = 0,
    ry = 0,
    rz = 0,
    sx = 1,
    sy = 1,
    sz = 1,
  ): THREE.Mesh {
    const m = new THREE.Mesh(geom, this.mat);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    m.scale.set(sx, sy, sz);
    this.group.add(m);
    return m;
  }

  /** Crouched pose built from primitives — pure silhouette. */
  private buildBody(): void {
    this.part(new THREE.SphereGeometry(0.34, 14, 14), 0.12, 1.62, 0, 0, 0, 0, 1, 0.92, 1); // head
    this.part(new THREE.CylinderGeometry(0.26, 0.34, 0.95, 10), -0.08, 0.95, 0, 0, 0, 0.5); // torso (leaning forward)
    this.part(new THREE.CylinderGeometry(0.11, 0.13, 0.85, 8), -0.42, 0.42, 0.16, 0, 0, 1.25); // back thigh
    this.part(new THREE.CylinderGeometry(0.09, 0.11, 0.8, 8), -0.95, 0.18, 0.16, 0, 0, -0.9); // back shin folded
    this.part(new THREE.CylinderGeometry(0.11, 0.13, 0.8, 8), -0.1, 0.36, -0.18, 0, 0, 0.35); // front thigh
    this.part(new THREE.CylinderGeometry(0.09, 0.11, 0.75, 8), 0.12, 0.0, -0.18, 0, 0, -0.15); // front shin
    this.part(new THREE.BoxGeometry(0.34, 0.12, 0.16), 0.16, -0.36, -0.18); // front foot
    this.part(new THREE.BoxGeometry(0.34, 0.12, 0.16), -1.2, -0.1, 0.16); // back foot
    this.part(new THREE.CylinderGeometry(0.09, 0.1, 0.8, 8), 0.58, 1.45, 0.05, 0, 0, -1.35); // firing arm (extended)
    this.part(new THREE.SphereGeometry(0.12, 10, 10), 0.98, 1.62, 0.05); // firing hand
    this.part(new THREE.CylinderGeometry(0.08, 0.09, 0.6, 8), -0.28, 1.15, -0.22, 0, 0, 0.9); // support arm down
    this.part(new THREE.SphereGeometry(0.1, 10, 10), -0.52, 0.88, -0.22); // support hand on ledge
  }

  /** World-space position of the firing hand (recomputed each frame). */
  handWorld(): THREE.Vector3 {
    return this.group.localToWorld(this.handLocal.clone());
  }

  addTo(scene: THREE.Scene): void {
    scene.add(this.group);
  }
}
