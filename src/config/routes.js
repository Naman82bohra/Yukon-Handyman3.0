/* ============================================
   Yukon Handyman 3.0 — Routes
   ============================================ */

import { router } from '../core/router.js';
import { ROUTES } from '../core/constants.js';

export function initRoutes() {
  router.register(ROUTES.HOME, () => {
    import('../features/hero/hero.js').then(m => m.initHero());
  });

  router.register(ROUTES.SERVICES, () => {
    import('../features/services/services.js').then(m => m.initServicesPage());
  });

  router.register(ROUTES.PROJECTS, () => {
    import('../features/portfolio/portfolio.js').then(m => m.initPortfolioPage());
  });

  router.register(ROUTES.CONTACT, () => {
    import('../features/contact/contact.js').then(m => m.initContactPage());
  });

  router.register(ROUTES.CAREERS, () => {
    import('../features/careers/careers.js').then(m => m.initCareersPage());
  });

  router.register(ROUTES.REVIEWS, () => {
    import('../features/reviews/reviews.js').then(m => m.initReviewsPage());
  });

  router.register(ROUTES.QUOTE, () => {
    import('../features/quote/form.js').then(m => m.initQuotePage());
  });

  router.init();
}
