/* ============================================
   Yukon Handyman 3.0 — Theme
   ============================================ */

import { storage } from '../../src/core/storage.js';

export function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const currentTheme = storage.getTheme();
  document.documentElement.setAttribute('data-theme', currentTheme);

  toggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    storage.setTheme(newTheme);

    // Update icon
    const icon = toggle.querySelector('svg');
    if (icon) {
      icon.innerHTML = newTheme === 'dark'
        ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
        : '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
    }
  });
}
