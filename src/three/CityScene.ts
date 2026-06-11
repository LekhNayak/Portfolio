import * as THREE from 'three';
import { COLORS, windowTexture } from './Materials';

type BuildingDef = readonly [x: number, width: number, height: number, z: number];

/**
 * The city skyline: textured building boxes with ink edge-line overlays and
 * rooftop ledges, plus a distant flat silhouette row for depth.
 *
 * Building index `HERO_BIDX` (the foreground right tower) becomes the hero's
 * rooftop perch and is exposed as `heroBuilding`.
 */
export class CityScene {
  /** Buildings + their edges + ledges. */
  readonly city = new THREE.Group();
  /** Far flat skyline silhouette. */
  readonly farRow = new THREE.Group();
  /** Foreground tower that the hero stands on. */
  heroBuilding!: THREE.Mesh;

  static readonly HERO_BIDX = 6;
  static readonly HERO_BH = 12.5;

  private static readonly BUILDING_DEFS: readonly BuildingDef[] = [
    // [x, width, height, z]
    [-13, 3, 7, -6],
    [-9.5, 2.6, 10, -5],
    [-6, 3.4, 14, -4.5],
    [-2.4, 2.4, 8, -6.5],
    [0.8, 3, 11, -5.5],
    [4.4, 2.8, 9, -6],
    [8.2, 3.6, 12.5, -2.6],
    [12.6, 3, 8, -6.2],
    [16.2, 3.4, 10.5, -5.4],
    [-17, 3, 9, -7],
    [19.8, 2.8, 7.5, -7],
  ];

  constructor() {
    this.buildCity();
    this.buildFarRow();
  }

  private buildCity(): void {
    CityScene.BUILDING_DEFS.forEach((d, i) => {
      const [bx, bw, bh, bz] = d;
      const g = new THREE.BoxGeometry(bw, bh, bw);
      const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: windowTexture(bw, bh) }));
      m.position.set(bx, bh / 2 - 4.5, bz);
      this.city.add(m);

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(g),
        new THREE.LineBasicMaterial({ color: COLORS.INK, transparent: true, opacity: 0.9 }),
      );
      edges.position.copy(m.position);
      this.city.add(edges);

      // rooftop ledge
      const ledge = new THREE.Mesh(
        new THREE.BoxGeometry(bw + 0.3, 0.22, bw + 0.3),
        new THREE.MeshBasicMaterial({ color: COLORS.INK }),
      );
      ledge.position.set(bx, bh - 4.5 + 0.11, bz);
      this.city.add(ledge);

      if (i === CityScene.HERO_BIDX) this.heroBuilding = m; // foreground right tower = hero's perch
    });
  }

  private buildFarRow(): void {
    for (let i = 0; i < 16; i++) {
      const w = 2 + Math.random() * 2.5;
      const h = 4 + Math.random() * 8;
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({ color: 0xd9d4c4, transparent: true, opacity: 0.55 }),
      );
      m.position.set(-22 + i * 3, h / 2 - 4.5, -16);
      this.farRow.add(m);
    }
  }

  addTo(scene: THREE.Scene): void {
    scene.add(this.city);
    scene.add(this.farRow);
  }
}
