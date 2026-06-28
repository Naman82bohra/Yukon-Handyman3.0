/* ============================================
   Yukon Handyman 3.0 — Application Entry
   ============================================ */

// Core
import { appConfig } from '../../src/config/app.config.js';
import { router } from '../../src/core/router.js';
import { storage } from '../../src/core/storage.js';
import { loadJSON } from '../../src/core/helpers.js';

// Features
import { initNavbar } from './navigation.js';
import { initLoader } from './loader.js';
// import { initAurora } from './aurora.js';
import { initAnimations } from './animations.js';
import { initMagneticButtons } from './magnetic-buttons.js';
import { initCustomCursor } from './cursor.js';
import { initScroll } from './scroll.js';

// Page-specific init functions (lazy loaded)
async function initPageSpecific() {
  const path = window.location.pathname;
  
  switch (true) {
    case path === '/' || path === '/index.html':
      const hero = await import('../../src/features/hero/hero.js');
      hero.initHero();
      
      const services = await import('../../src/features/services/services.js');
      services.initServicesGrid();
      
      const { initReviewsGrid } = await import('../../src/features/reviews/reviews.js');
      initReviewsGrid();
      break;
      
    case path.includes('/services.html'):
      const { initServicesPage } = await import('../../src/features/services/services.js');
      initServicesPage();
      break;
      
    case path.includes('/service-details.html'):
      const { initServiceDetail } = await import('../../src/features/services/services.js');
      if (initServiceDetail) initServiceDetail();
      break;
      
    case path.includes('/projects.html'):
      const { initPortfolioPage } = await import('../../src/features/portfolio/portfolio.js');
      initPortfolioPage();
      break;
      
    case path.includes('/project-details.html'):
      const { initProjectDetail } = await import('../../src/features/portfolio/portfolio.js');
      if (initProjectDetail) initProjectDetail();
      break;
      
    case path.includes('/reviews.html'):
      const { initReviewsPage } = await import('../../src/features/reviews/reviews.js');
      initReviewsPage();
      break;
      
    case path.includes('/contact.html'):
      const { initContactPage } = await import('../../src/features/contact/contact.js');
      initContactPage();
      break;
      
    case path.includes('/careers.html'):
      const { initCareersPage } = await import('../../src/features/careers/careers.js');
      initCareersPage();
      break;
      
    case path.includes('/quote.html'):
      const { initQuotePage } = await import('../../src/features/quote/form.js');
      initQuotePage();
      break;
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  // Init preloader FIRST — no await dependency so it starts immediately
  initLoader();
  
  // Load settings (async — preloader is already running)
  const settings = await loadJSON(appConfig.data.settings);
  
  // Helper: run a function silently — never let one failure cascade
  const safe = (name, fn) => {
    try {
      const result = fn();
      if (result && typeof result.then === 'function') {
        return result.catch(err =>
          console.warn(`[YH] ${name} init error:`, err)
        );
      }
      return result;
    } catch (err) {
      console.warn(`[YH] ${name} init error:`, err);
    }
  };

  // Init core features (each wrapped so one failure never blocks the others)
  safe('Navbar',     () => initNavbar());
//  safe('Aurora',     () => initAurora());
  safe('Magnetic',   () => initMagneticButtons());
  safe('Scroll',     () => initScroll());
  
  // Init cursor (only on desktop)
  if (window.innerWidth > 768 && settings?.display?.cursorEffect !== false) {
    safe('Cursor', () => initCustomCursor());
  }
  
  // Init animations
  safe('Animations', () => initAnimations());
  
  // Init page specific (awaited — router.init depends on it completing)
  try {
    await initPageSpecific();
  } catch (err) {
    console.warn('[YH] PageSpecific init error:', err);
  }
  
  // Init router for active nav
  safe('Router', () => router.init());
  
  // Remove no-js class
  document.documentElement.classList.remove('no-js');
  
  console.log(`🏔️ Yukon Handyman ${appConfig.version} loaded`);
});
