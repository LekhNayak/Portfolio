import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/** Registers GSAP plugins exactly once across the app. */
export function registerGsap(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  // Mobile browsers (esp. Firefox) fire resize as the URL bar shows/hides.
  // Ignoring it stops ScrollTrigger from re-measuring mid-scroll and leaving
  // reveal content stranded.
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

export { gsap, ScrollTrigger };
