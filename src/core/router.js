/* ============================================
   Yukon Handyman 3.0 — Router
   ============================================ */

import { ROUTES } from './constants.js';

class Router {
  constructor() {
    this.routes = new Map();
    this.currentPath = window.location.pathname;
  }

  register(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  navigate(path) {
    if (path === this.currentPath) return;
    window.location.href = path;
  }

  getCurrentPath() {
    return window.location.pathname;
  }

  isActive(path) {
    return this.currentPath === path;
  }

  init() {
    const path = this.getCurrentPath();
    const handler = this.routes.get(path);
    if (handler) handler();

    // Handle nav links
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) this.navigate(href);
      });
    });

    // Mark active nav
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && path.endsWith(href)) {
        link.classList.add('active');
      }
    });
  }
}

export const router = new Router();
