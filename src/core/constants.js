/* ============================================
   Yukon Handyman 3.0 — Constants
   ============================================ */

export const APP = {
  NAME: 'Yukon Handyman',
  VERSION: '3.0.0',
  TAGLINE: 'Premium Home Services, Northern Strong',
};

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services.html',
  SERVICE_DETAILS: '/service-details.html',
  PROJECTS: '/projects.html',
  PROJECT_DETAILS: '/project-details.html',
  ABOUT: '/about.html',
  CONTACT: '/contact.html',
  CAREERS: '/careers.html',
  REVIEWS: '/reviews.html',
  QUOTE: '/quote.html',
  FINANCING: '/financing.html',
  PRIVACY: '/privacy.html',
  TERMS: '/terms.html',
};

export const BREAKPOINTS = {
  SM: 480,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1400,
};

export const ANIMATION = {
  DURATION_FAST: 0.3,
  DURATION_NORMAL: 0.5,
  DURATION_SLOW: 0.8,
  DURATION_SLOWER: 1.2,
  EASE_OUT: [0.16, 1, 0.3, 1],
  EASE_GOLD: [0.34, 1.56, 0.64, 1],
};

export const STORAGE_KEYS = {
  THEME: 'yh-theme',
  QUOTES: 'yh-quotes',
  RECENT_SEARCHES: 'yh-recent-searches',
};

// Safely resolve Vite environment variables.
// `import.meta.env` is only available when processed by Vite.
// Outside Vite (e.g. Live Server, direct file open) it is undefined,
// so we use optional chaining + fallbacks to prevent crashes.
const env =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env
    : {};

export const API = {
  EMAILJS_SERVICE_ID: env.VITE_EMAILJS_SERVICE_ID || '',
  EMAILJS_TEMPLATE_ID: env.VITE_EMAILJS_TEMPLATE_ID || '',
  EMAILJS_PUBLIC_KEY: env.VITE_EMAILJS_PUBLIC_KEY || '',
  HOUSECALL_PRO_API_KEY: env.VITE_HOUSECALL_PRO_API_KEY || '',
  WEATHER_API_KEY: env.VITE_WEATHER_API_KEY || '',
  WEATHER_API_URL: 'https://api.openweathermap.org/data/2.5',
  GOOGLE_MAPS_KEY: env.VITE_GOOGLE_MAPS_KEY || '',
};
