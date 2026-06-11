import * as THREE from 'three';
import gsap from 'gsap';
import { COLORS } from './Materials';
import type { HeroSilhouette } from './HeroSilhouette';

const WEB_SEGS = 900;
const RADIAL = 6;

interface CheckpointData {
  at: number;
  shown: boolean;
}

interface Shot {
  mesh: THREE.Mesh;
  seg: number;
  t: number;
}

/**
 * THE WEB — the long 3D strand that draws across the sky as the page scrolls,
 * its glowing leading tip, the radial "checkpoint" webs that pop in as the
 * strand reaches them, and the quick web-shots the hero fires on click.
 *
 * The curve originates at the hero's firing hand (recomputed at build time)
 * and arcs out across the city via a CatmullRom spline.
 */
export class WebShooter {
  private readonly hero: HeroSilhouette;
  private scene!: THREE.Scene;

  private readonly webCurve: THREE.CatmullRomCurve3;
  private readonly web: THREE.Mesh;
  private readonly web2: THREE.Mesh;
  private readonly tip: THREE.Mesh;
  private readonly tipRing: THREE.Mesh;
  private readonly checkpoints: THREE.Group[] = [];
  private readonly shots: Shot[] = [];

  constructor(hero: HeroSilhouette) {
    this.hero = hero;
    this.webCurve = this.buildWebCurve();

    // main ink strand
    const webGeo = new THREE.TubeGeometry(this.webCurve, WEB_SEGS, 0.045, RADIAL, false);
    this.web = new THREE.Mesh(webGeo, new THREE.MeshBasicMaterial({ color: COLORS.INK }));
    this.web.geometry.setDrawRange(0, 0);

    // thin twin strand slightly offset (double-thread look)
    this.web2 = new THREE.Mesh(
      new THREE.TubeGeometry(this.webCurve, WEB_SEGS, 0.016, RADIAL, false),
      new THREE.MeshBasicMaterial({ color: COLORS.RED }),
    );
    this.web2.position.y = 0.09;
    this.web2.geometry.setDrawRange(0, 0);

    // glowing tip + spark at the leading end of the web
    this.tip = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 10, 10),
      new THREE.MeshBasicMaterial({ color: COLORS.RED }),
    );
    this.tipRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.02, 6, 24),
      new THREE.MeshBasicMaterial({ color: COLORS.INK, transparent: true, opacity: 0.7 }),
    );

    this.buildCheckpoints();
  }

  private buildWebCurve(): THREE.CatmullRomCurve3 {
    const h = this.hero.handWorld();
    const pts = [
      h,
      h.clone().add(new THREE.Vector3(-3.2, 2.6, 1.2)),
      new THREE.Vector3(3.5, 8, -1),
      new THREE.Vector3(-1, 5, 2.5),
      new THREE.Vector3(-6, 9, -2),
      new THREE.Vector3(-11, 5.5, 3),
      new THREE.Vector3(-16, 10, -3),
      new THREE.Vector3(-21, 6.5, 2),
      new THREE.Vector3(-27, 10.5, -4),
      new THREE.Vector3(-33, 7.5, 1),
    ];
    return new THREE.CatmullRomCurve3(pts);
  }

  /** Radial web "checkpoints" that pop in as the web passes them. */
  private buildCheckpoints(): void {
    [0.22, 0.45, 0.68, 0.9].forEach((at) => {
      const grp = new THREE.Group();
      const SP = 10;
      for (let s = 0; s < SP; s++) {
        const a = (s / SP) * Math.PI * 2;
        const g = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(Math.cos(a) * 0.9, Math.sin(a) * 0.9, 0),
        ]);
        grp.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color: COLORS.INK, transparent: true, opacity: 0.8 })));
      }
      for (let r = 0.25; r <= 0.85; r += 0.2) {
        const ringPts: THREE.Vector3[] = [];
        for (let s = 0; s <= SP; s++) {
          const a = (s / SP) * Math.PI * 2;
          ringPts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0));
        }
        grp.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(ringPts),
            new THREE.LineBasicMaterial({ color: COLORS.INK, transparent: true, opacity: 0.6 }),
          ),
        );
      }
      const p = this.webCurve.getPointAt(at);
      grp.position.copy(p);
      grp.scale.setScalar(0);
      grp.userData = { at, shown: false } satisfies CheckpointData;
      this.checkpoints.push(grp);
    });
  }

  /**
   * Hero fires a quick web at an unprojected cursor target. Returns the recoil
   * value caller may want, but recoil is left to the SceneManager.
   */
  fire(camera: THREE.PerspectiveCamera, clientX: number, clientY: number): void {
    const v = new THREE.Vector3(
      (clientX / window.innerWidth) * 2 - 1,
      -(clientY / window.innerHeight) * 2 + 1,
      0.5,
    ).unproject(camera);
    const dir = v.sub(camera.position).normalize();
    const target = camera.position.clone().add(dir.multiplyScalar(13));
    const start = this.hero.handWorld();
    const mid = start.clone().lerp(target, 0.5).add(new THREE.Vector3(0, 1.2, 0));
    const curve = new THREE.CatmullRomCurve3([start, mid, target]);
    const SEG = 60;
    const g = new THREE.TubeGeometry(curve, SEG, 0.03, 5, false);
    g.setDrawRange(0, 0);
    const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: COLORS.RED }));
    this.scene.add(m);
    this.shots.push({ mesh: m, seg: SEG, t: 0 });
  }

  /**
   * Advance the scroll-driven web, leading tip, sway, checkpoints and fired
   * shots. Returns the leading-tip world point so the camera can follow it.
   */
  update(webProgress: number, t: number, dt: number, mouse: { x: number; y: number }, camera: THREE.Camera): THREE.Vector3 {
    const segsOn = Math.floor(webProgress * WEB_SEGS);
    this.web.geometry.setDrawRange(0, Math.max(0, segsOn * RADIAL * 6));
    this.web2.geometry.setDrawRange(0, Math.max(0, segsOn * RADIAL * 6));

    // tip follows the leading end + spins
    const tp = this.webCurve.getPointAt(Math.max(0.001, Math.min(0.999, webProgress)));
    this.tip.position.copy(tp);
    this.tip.scale.setScalar(1 + Math.sin(t * 8) * 0.18);
    this.tipRing.position.copy(tp);
    this.tipRing.rotation.z = t * 3;
    this.tipRing.rotation.y = t * 2;
    this.tipRing.scale.setScalar(1 + Math.sin(t * 5) * 0.12);

    // gentle sway of the whole web like it's alive in the wind
    this.web.rotation.z = Math.sin(t * 0.8) * 0.012 + mouse.y * 0.02;
    this.web2.rotation.z = this.web.rotation.z;

    // checkpoint radial webs pop when the strand reaches them
    this.checkpoints.forEach((cp) => {
      const data = cp.userData as CheckpointData;
      if (!data.shown && webProgress > data.at) {
        data.shown = true;
        gsap.to(cp.scale, { x: 1, y: 1, z: 1, duration: 0.6, ease: 'back.out(2.5)' });
      }
      if (data.shown && webProgress < data.at - 0.03) {
        data.shown = false;
        gsap.to(cp.scale, { x: 0, y: 0, z: 0, duration: 0.3 });
      }
      cp.lookAt(camera.position);
    });

    this.updateShots(dt);
    return tp;
  }

  /** Fired shots animate out then fade + self-dispose. */
  private updateShots(dt: number): void {
    for (let i = this.shots.length - 1; i >= 0; i--) {
      const s = this.shots[i];
      s.t += dt * 3.2;
      const on = Math.min(1, s.t);
      s.mesh.geometry.setDrawRange(0, Math.floor(on * s.seg) * 5 * 6);
      if (s.t > 1.4) {
        const mat = s.mesh.material as THREE.MeshBasicMaterial;
        mat.transparent = true;
        mat.opacity = Math.max(0, 1 - (s.t - 1.4) * 2);
        if (mat.opacity <= 0) {
          this.scene.remove(s.mesh);
          s.mesh.geometry.dispose();
          mat.dispose();
          this.shots.splice(i, 1);
        }
      }
    }
  }

  addTo(scene: THREE.Scene): void {
    this.scene = scene;
    scene.add(this.web, this.web2, this.tip, this.tipRing);
    this.checkpoints.forEach((cp) => scene.add(cp));
  }
}
