/* ============================================
   Yukon Handyman 3.0 — Hero Module
   ============================================ */

import { loadJSON, isInViewport } from '../../core/helpers.js';
import { appConfig } from '../../config/app.config.js';

export async function initHero() {
  const hero = document.querySelector('.hero-section');
  if (!hero) return;

  const services = await loadJSON(appConfig.data.services);

  // Animate hero content on load
  const heroContent = hero.querySelector('.hero-content');
  if (heroContent) {
    heroContent.classList.add('animate-fadeInUp');
  }

  // Add scroll indicator
  const scrollIndicator = hero.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    setTimeout(() => scrollIndicator.classList.add('show'), 2000);
  }

  // Service hotspots
  const hotspots = hero.querySelectorAll('.service-hotspot');
  hotspots.forEach((hotspot, index) => {
    const service = services[index];
    if (!service) return;

    const tooltip = hotspot.querySelector('.hotspot-tooltip');
    if (tooltip) {
      tooltip.textContent = service.title;
    }

    hotspot.addEventListener('click', () => {
      const serviceSection = document.getElementById('services');
      if (serviceSection) {
        serviceSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (hero) {
      const parallax = hero.querySelector('.hero-background');
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }
  }, { passive: true });
}
