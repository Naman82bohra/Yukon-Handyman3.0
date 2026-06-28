/* ============================================
   Yukon Handyman 3.0 — Smooth Scroll
   Graceful fallback if Lenis is not available
   (e.g. loading without Vite's module resolution).
   ============================================ */

let Lenis = null;

// Dynamic import with fallback — bare specifier "lenis" only works
// when a bundler (Vite) resolves it.  In plain browser modules
// we gracefully skip smooth scroll.
try {
  const mod = await import('lenis');
  Lenis = mod.default || mod;
} catch {
  console.warn('[YH] Lenis not available — smooth scroll disabled.');
}

let lenis = null;

export function initScroll() {
  // Only on desktop
  if (window.innerWidth < 768) return;
  if (!Lenis) return;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

export function getLenis() {
  return lenis;
}

export function scrollTo(target, options = {}) {
  if (lenis) {
    lenis.scrollTo(target, options);
  }
}
