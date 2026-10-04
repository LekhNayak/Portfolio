import { useEffect, type RefObject } from 'react';
import type { JSAnimation } from 'animejs';
import { registerGsap, gsap, ScrollTrigger } from '@/animations/registerGsap';
import { decodeText, drawStrokes, ripple, springIn, wiggle } from '@/animations/animeEffects';
import shared from '@/styles/shared.module.scss';

/**
 * V3 enhancements — anime.js micro-interactions fired by GSAP ScrollTrigger:
 *  - section eyebrows + footer lines decode in HUD-style
 *  - experience nodes emit radar rings as their card slides in
 *  - achievement icons wiggle on hover
 *  - contact icons spring in, the envelope inks itself, and icons wiggle on hover
 *
 * Nothing here hides content up front, so if it never runs (reduced motion)
 * the page is simply in its normal static state.
 */
export function useAnimeEnhancements(scopeRef: RefObject<HTMLElement | null>, reduceMotion: boolean): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || reduceMotion) return;
    registerGsap();

    const anims: JSAnimation[] = [];
    const cleanups: (() => void)[] = [];
    const track = (a: JSAnimation | null) => {
      if (a) anims.push(a);
    };
    const on = (el: Element, type: string, fn: EventListener) => {
      el.addEventListener(type, fn);
      cleanups.push(() => el.removeEventListener(type, fn));
    };

    const ctx = gsap.context(() => {
      // ---- decode: eyebrows (in scope) + footer lines (outside the skew-wrap) ----
      const decodables = [
        ...scope.querySelectorAll<HTMLElement>(`.${shared.eyebrow}`),
        ...document.querySelectorAll<HTMLElement>('[data-decode]'),
      ];
      decodables.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () => cleanups.push(decodeText(el)),
        });
      });

      // ---- experience: radar rings as each card arrives ----
      scope.querySelectorAll<HTMLElement>('.tl-item').forEach((item) => {
        const ring = item.querySelector<HTMLElement>('.tl-ring');
        if (!ring) return;
        ScrollTrigger.create({
          trigger: item,
          start: 'top 85%',
          once: true,
          onEnter: () => track(ripple(ring, 450)),
        });
      });

      // ---- achievements: icon wiggle on hover (the badge keeps its CSS hover) ----
      scope.querySelectorAll<HTMLElement>('.badge-pop').forEach((badge) => {
        const icon = badge.querySelector('svg');
        if (icon) on(badge, 'mouseenter', () => wiggle(icon));
      });

      // ---- contact: icons spring in, envelope inks itself, wiggle on hover ----
      scope.querySelectorAll<HTMLElement>('.js-social').forEach((row) => {
        const links = [...row.querySelectorAll<HTMLElement>('a')];
        const icons = links.map((a) => a.querySelector('svg')).filter((s): s is SVGSVGElement => !!s);
        const stroked = icons.filter((s) => s.getAttribute('fill') === 'none');
        ScrollTrigger.create({
          trigger: row,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            track(springIn(icons, 350));
            stroked.forEach((s) => track(drawStrokes(s, 500)));
          },
        });
        links.forEach((a) => {
          const icon = a.querySelector('svg');
          if (!icon) return;
          on(a, 'mouseenter', () => {
            wiggle(icon);
            if (icon.getAttribute('fill') === 'none') drawStrokes(icon);
          });
        });
      });
    }, scope);

    // hover tweens are short-lived and self-settling, so only the one-shot
    // arrival animations are tracked for revert on unmount
    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
      anims.forEach((a) => a.revert());
    };
  }, [scopeRef, reduceMotion]);
}
