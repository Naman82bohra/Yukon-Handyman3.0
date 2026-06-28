/* ============================================
   Yukon Handyman 3.0 — Scroll Animations
   ============================================ */

export function initAnimations() {
  // Fade-in elements on scroll
  const fadeElements = document.querySelectorAll('[data-animate="fadeIn"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeIn');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeElements.forEach(el => observer.observe(el));

  // Fade-up elements
  const fadeUpElements = document.querySelectorAll('[data-animate="fadeInUp"]');
  const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        fadeUpObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeUpElements.forEach(el => fadeUpObserver.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const duration = parseInt(el.dataset.duration) || 2000;
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        
        animateCount(el, target, duration, prefix, suffix);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));
}

function animateCount(el, target, duration, prefix, suffix) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    
    el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}
