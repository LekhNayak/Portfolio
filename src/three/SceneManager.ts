import * as THREE from 'three';
import gsap from 'gsap';
import type { RefObject } from 'react';
import { CityScene } from './CityScene';
import { HeroSilhouette } from './HeroSilhouette';
import { Moon } from './Moon';
import { Clouds } from './Clouds';
import { Particles } from './Particles';
import { WebShooter } from './WebShooter';
import { comicBurst, webSplat } from './comicFx';
import type { SceneBindings } from '@/context/SceneBindingsContext';

/**
 * Owns the entire WebGL world: renderer, scene, camera, all sub-modules, the
 * render loop, the input listeners (mouse parallax + click-to-fire + resize)
 * and full GPU disposal on teardown.
 *
 * Scroll is fed in from React via `setScroll`; per-frame HUD text is written
 * imperatively through the shared `SceneBindings` ref to avoid 60fps React
 * re-renders.
 */
export class SceneManager {
  private readonly reduceMotion: boolean;
  private readonly bindings: RefObject<SceneBindings>;

  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly clock = new THREE.Clock();

  private readonly city: CityScene;
  private readonly hero: HeroSilhouette;
  private readonly moon: Moon;
  private readonly clouds: Clouds;
  private readonly particles: Particles;
  private readonly web: WebShooter;

  private readonly mouse = { x: 0, y: 0 };
  private readonly camBase = { x: 0, y: 5, z: 14 };
  private webProgress = 0;
  private webTarget = 0;

  private rafId = 0;
  private started = false;

  constructor(canvas: HTMLCanvasElement, reduceMotion: boolean, bindings: RefObject<SceneBindings>) {
    this.reduceMotion = reduceMotion;
    this.bindings = bindings;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xf9f3e2, 26, 60);

    this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    this.camera.position.set(-2, 3.5, 14);

    // ---- build the world (order matters: hero needs the tower, web needs the hero hand) ----
    this.city = new CityScene();
    this.city.addTo(this.scene);

    this.hero = new HeroSilhouette(this.city.heroBuilding, CityScene.HERO_BH);
    this.hero.addTo(this.scene);

    this.moon = new Moon(this.hero.perch);
    this.moon.addTo(this.scene);

    this.clouds = new Clouds();
    this.clouds.addTo(this.scene);

    this.particles = new Particles();
    this.particles.addTo(this.scene);

    this.web = new WebShooter(this.hero);
    this.web.addTo(this.scene);

    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('resize', this.onResize);
  }

  // -------------------------------------------------- input

  private onPointerMove = (e: PointerEvent): void => {
    this.mouse.x = e.clientX / window.innerWidth - 0.5;
    this.mouse.y = e.clientY / window.innerHeight - 0.5;
  };

  private onPointerDown = (e: PointerEvent): void => {
    this.web.fire(this.camera, e.clientX, e.clientY);
    // quick hero arm recoil
    gsap.fromTo(this.hero.group.rotation, { z: 0 }, { z: -0.06, duration: 0.08, yoyo: true, repeat: 1 });
    comicBurst(e.clientX, e.clientY);
    webSplat(e.clientX, e.clientY);
  };

  private onResize = (): void => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // -------------------------------------------------- public API

  /** Fed by the scroll hook: smoothed web extension target [0..1]. */
  setScroll(p: number): void {
    this.webTarget = p;
  }

  /** Begin the loop. In reduced-motion mode renders a single frame only. */
  start(): void {
    if (this.started) return;
    this.started = true;
    this.tick();
    if (this.reduceMotion) this.renderer.render(this.scene, this.camera);
  }

  /** Camera fly-in, matching the original loader → entrance timeline. */
  playIntro(): void {
    if (this.reduceMotion) return;
    gsap.from(this.camera.position, { z: 24, y: 8, duration: 2.6, ease: 'power3.out' });
  }

  // -------------------------------------------------- render loop

  private tick = (): void => {
    const dt = this.clock.getDelta();
    const t = this.clock.getElapsedTime();

    // hero idle: breathing + slight head/arm motion
    this.hero.group.position.y = this.hero.perch.y + Math.sin(t * 1.6) * 0.04;
    this.hero.group.rotation.y = this.hero.baseRotY + Math.sin(t * 0.5) * 0.05 + this.mouse.x * 0.15;

    // moon gently pulses + always faces camera
    this.moon.update(t, this.camera);

    // web extends toward scroll target with smoothing — fires fast on every scroll
    this.webProgress += (this.webTarget - this.webProgress) * 0.08;
    const tp = this.web.update(this.webProgress, t, dt, this.mouse, this.camera);

    const hudWeb = this.bindings.current.hudWeb;
    if (hudWeb) hudWeb.textContent = String(Math.round(this.webProgress * 100)).padStart(3, '0') + '%';

    // camera: starts framing the hero on the right, then follows the web tip left across the city
    const followX = THREE.MathUtils.lerp(this.camBase.x, tp.x * 0.55, this.webProgress);
    const followY = THREE.MathUtils.lerp(this.camBase.y, 2.5 + tp.y * 0.35, this.webProgress);
    const followZ = THREE.MathUtils.lerp(this.camBase.z, 15.5, this.webProgress);
    this.camera.position.x += (followX + this.mouse.x * 1.6 - this.camera.position.x) * 0.05;
    this.camera.position.y += (followY - this.mouse.y * 1.0 - this.camera.position.y) * 0.05;
    this.camera.position.z += (followZ - this.camera.position.z) * 0.05;
    const perch = this.hero.perch;
    const lookStart = new THREE.Vector3(perch.x - 4.6, perch.y - 2.2, perch.z); // hero sits right-of-center
    const look = new THREE.Vector3().lerpVectors(lookStart, tp, Math.min(1, this.webProgress * 1.25 + 0.05));
    this.camera.lookAt(look);

    // clouds drift + ambient particle dust
    this.clouds.update(dt);
    this.particles.update(dt, t);

    this.renderer.render(this.scene, this.camera);
    if (!this.reduceMotion) this.rafId = requestAnimationFrame(this.tick);
  };

  // -------------------------------------------------- teardown

  dispose(): void {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerdown', this.onPointerDown);
    window.removeEventListener('resize', this.onResize);

    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.hero.group.rotation);

    this.scene.traverse((obj) => {
      const mesh = obj as Partial<THREE.Mesh> & Partial<THREE.Line>;
      mesh.geometry?.dispose?.();
      const mat = (obj as THREE.Mesh).material;
      if (Array.isArray(mat)) {
        mat.forEach((m) => SceneManager.disposeMaterial(m));
      } else if (mat) {
        SceneManager.disposeMaterial(mat);
      }
    });

    this.renderer.dispose();
  }

  private static disposeMaterial(mat: THREE.Material): void {
    const basic = mat as THREE.MeshBasicMaterial;
    basic.map?.dispose();
    mat.dispose();
  }
}
