import { gsap, ScrollTrigger } from './registerGsap';

/**
 * Scroll-driven effects. Every function uses plain selector strings so it can
 * be invoked INSIDE a `gsap.context(fn, scope)` — the context scopes the
 * selectors to the page root and `ctx.revert()` tears down all the triggers.
 *
 * The selectors (`.reveal`, `.flip3d`, `.num`, `.card`, `.cards`, `.skew-wrap`)
 * are stable global marker classes attached alongside the SCSS-module classes.
 */

/** Fade + rise reveals. */
export function createReveals(): void {
  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });
}

/** 3D flip-down headings. */
export function createFlips(): void {
  gsap.utils.toArray<HTMLElement>('.flip3d').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      rotateX: 0,
      y: 0,
      duration: 1.3,
      ease: 'back.out(1.5)',
      transformPerspective: 900,
      scrollTrigger: { trigger: el, start: 'top 86%' },
    });
  });
}

/**
 * Reads the counter formatting from a `.num` element:
 *  - `data-count`    target value (may be a float)
 *  - `data-decimals` fixed decimal places (default 0)
 *  - `data-suffix`   explicit suffix; falls back to `%` for 100, else `+`
 */
function counterConfig(el: HTMLElement) {
  const target = +(el.dataset.count ?? '0');
  const decimals = +(el.dataset.decimals ?? '0');
  const suffix = el.dataset.suffix ?? (target === 100 ? '%' : '+');
  return { target, decimals, suffix };
}

export function formatCount(value: number, decimals: number, suffix: string): string {
  return value.toFixed(decimals) + suffix;
}

/** Animated number counters — supports decimals + custom suffixes. */
export function createCounters(): void {
  gsap.utils.toArray<HTMLElement>('.num[data-count]').forEach((el) => {
    const { target, decimals, suffix } = counterConfig(el);
    const proxy = { v: 0 };
    const step = decimals > 0 ? Number((10 ** -decimals).toFixed(decimals)) : 1;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          proxy,
          { v: 0 },
          {
            v: target,
            duration: 2,
            ease: 'power2.out',
            snap: { v: step },
            onUpdate() {
              el.textContent = formatCount(proxy.v, decimals, suffix);
            },
            onComplete() {
              el.textContent = formatCount(target, decimals, suffix);
            },
          },
        );
      },
    });
  });
}

/** Reduced-motion fallback: write each counter's final formatted value. */
export function setCountersInstant(scope: HTMLElement): void {
  scope.querySelectorAll<HTMLElement>('.num[data-count]').forEach((el) => {
    const { target, decimals, suffix } = counterConfig(el);
    el.textContent = formatCount(target, decimals, suffix);
  });
}

/** Velocity-based page skew that springs back to flat. */
export function createVelocitySkew(): void {
  const skewSet = gsap.quickSetter('.skew-wrap', 'skewY', 'deg');
  ScrollTrigger.create({
    onUpdate(self) {
      const v = Math.max(-4, Math.min(4, self.getVelocity() / -450));
      skewSet(v);
      gsap.to('.skew-wrap', { skewY: 0, duration: 0.7, ease: 'power3.out', overwrite: true });
    },
  });
}

/** Parallax scrub on the service cards. */
export function createCardScrub(): void {
  gsap.utils.toArray<HTMLElement>('.card').forEach((c, i) => {
    gsap.fromTo(
      c,
      { y: 60 * (i % 2 ? 1 : -0.4) },
      { y: 0, scrollTrigger: { trigger: '.cards', start: 'top 95%', end: 'top 30%', scrub: 1 } },
    );
  });
}

// ============================================================
// V2 ENHANCEMENTS — additive animations on NEW marker classes.
// They never touch the existing reveal/flip/card/web systems.
// ============================================================

/** Sequentially animate tech chips in as their container enters. */
export function createChipStagger(): void {
  gsap.utils.toArray<HTMLElement>('.js-chips').forEach((row) => {
    const chips = row.querySelectorAll<HTMLElement>('.chip');
    if (!chips.length) return;
    gsap.from(chips, {
      opacity: 0,
      y: 12,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.08,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: row, start: 'top 90%', once: true },
    });
  });
}

/** Draw the experience timeline spine as the section scrolls. */
export function createTimelineDraw(): void {
  gsap.utils.toArray<HTMLElement>('.tl-line').forEach((line) => {
    const parent = line.parentElement ?? line;
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: parent, start: 'top 70%', end: 'bottom 80%', scrub: 1 },
      },
    );
  });
}

/** Slide timeline cards in from alternating sides + pop their nodes. */
export function createTimelineItems(): void {
  gsap.utils.toArray<HTMLElement>('.tl-item').forEach((item) => {
    const side = item.dataset.side === 'r' ? 1 : -1;
    gsap.from(item, {
      x: 64 * side,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 85%', once: true },
    });
    const node = item.querySelector<HTMLElement>('.tl-node');
    if (node) {
      gsap.from(node, {
        scale: 0,
        duration: 0.6,
        ease: 'back.out(3)',
        scrollTrigger: { trigger: item, start: 'top 85%', once: true },
      });
    }
  });
}

/** Comic burst pop-in for achievement badges. */
export function createBadgePop(): void {
  gsap.utils.toArray<HTMLElement>('.badge-pop').forEach((b) => {
    gsap.from(b, {
      scale: 0,
      rotate: -12,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(2.2)',
      // hand transform back to CSS (per-badge rotate + :hover) once the pop ends
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: b, start: 'top 92%', once: true },
    });
  });
}

/** Reduced-motion fallback: make all reveal/flip content visible immediately. */
export function revealAllInstant(scope: HTMLElement): void {
  scope.querySelectorAll<HTMLElement>('.reveal, .flip3d').forEach((el) => {
    gsap.set(el, { opacity: 1, y: 0, rotateX: 0 });
  });
  scope.querySelectorAll<HTMLElement>('.num[data-count]').forEach((el) => {
    const target = +(el.dataset.count ?? '0');
    el.textContent = target + (target === 100 ? '%' : '+');
  });
}
