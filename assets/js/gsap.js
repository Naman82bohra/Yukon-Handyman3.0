/* ============================================
   Yukon Handyman 3.0 — GSAP Setup
   Graceful fallback when GSAP is not available
   (e.g. loading without Vite's module resolution).
   ============================================ */

/** @type {import('gsap') | null} */
let gsap = null;
/** @type {import('gsap/ScrollTrigger') | null} */
let ScrollTrigger = null;

try {
  const gsapMod = await import('gsap');
  const stMod = await import('gsap/ScrollTrigger');
  gsap = gsapMod.gsap || gsapMod.default || gsapMod;
  ScrollTrigger = stMod.ScrollTrigger || stMod.default || stMod;

  if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({
      ease: 'power3.out',
      duration: 1,
    });
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
  }
} catch {
  console.warn('[YH] GSAP not available — scroll-based animations disabled.');
  // Export no-op objects so importing code doesn't crash
  gsap = /** @type {any} */ ({
    to: () => ({ kill: () => {} }),
    fromTo: () => ({ kill: () => {} }),
    defaults: () => {},
    registerPlugin: () => {},
  });
  ScrollTrigger = /** @type {any} */ ({
    config: () => {},
    refresh: () => {},
  });
}

// Scroll-triggered fade-in utility
export function animateFadeIn(elements, options = {}) {
  if (!elements) return;
  
  const els = Array.isArray(elements) ? elements : [elements];
  
  els.forEach((el, i) => {
    gsap.fromTo(el,
      { 
        opacity: 0, 
        y: options.y || 40,
        scale: options.scale || 1,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: options.duration || 0.8,
        delay: options.staggerDelay ? i * options.staggerDelay : 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        ...options.overrides,
      }
    );
  });
}

// Parallax effect
export function initParallax() {
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.3;
    
    gsap.to(el, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

// Counter animation
export function animateCounter(element, target, options = {}) {
  if (!element) return;
  
  const { duration = 2, suffix = '', prefix = '' } = options;
  
  gsap.fromTo(element,
    { textContent: 0 },
    {
      textContent: target,
      duration,
      ease: 'power2.out',
      snap: { textContent: 1 },
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        element.textContent = prefix + Math.round(parseFloat(element.textContent)).toLocaleString() + suffix;
      },
    }
  );
}

// Text reveal animation
export function animateTextReveal(element) {
  if (!element) return;
  
  gsap.fromTo(element,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  );
}
