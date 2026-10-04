import { useEffect, useState } from 'react';
import { registerGsap, ScrollTrigger } from '@/animations/registerGsap';

/**
 * Tracks which section (by id) is currently crossing the middle of the
 * viewport, via one ScrollTrigger per section. Returns the active id, or null
 * while over the hero / between tracked sections.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    registerGsap();
    const triggers = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el)
      .map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActive(el.id);
            else setActive((cur) => (cur === el.id ? null : cur));
          },
        }),
      );
    return () => triggers.forEach((t) => t.kill());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
