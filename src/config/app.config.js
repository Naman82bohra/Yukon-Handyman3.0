/* ============================================
   Yukon Handyman 3.0 — App Configuration
   ============================================ */

export const appConfig = {
  name: 'Yukon Handyman',
  version: '3.0.0',

  data: {
    services: '/assets/data/services.json',
    projects: '/assets/data/projects.json',
    reviews: '/assets/data/reviews.json',
    gallery: '/assets/data/gallery.json',
    pricing: '/assets/data/pricing.json',
    faq: '/assets/data/faq.json',
    settings: '/assets/data/settings.json',
    team: '/assets/data/team.json',
    serviceAreas: '/assets/data/service-areas.json',
    testimonials: '/assets/data/testimonials.json',
  },

  features: {
    preloader: true,
    aurora: true,
    particles: true,
    smoothScroll: true,
    magneticButtons: true,
    customCursor: true,
    themeToggle: true,
    search: true,
    weather: true,
  },

  animations: {
    enabled: true,
    scrollTrigger: true,
    parallax: true,
    textReveal: true,
    counter: true,
  },

  forms: {
    contact: 'contact-form',
    quote: 'quote-form',
    careers: 'careers-form',
  },
};
