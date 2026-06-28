/* ============================================
   Yukon Handyman 3.0 — Gallery Module
   ============================================ */

import { loadJSON } from '../../core/helpers.js';
import { appConfig } from '../../config/app.config.js';

export async function initGallery() {
  const container = document.querySelector('.gallery-grid');
  if (!container) return;

  const gallery = await loadJSON(appConfig.data.gallery);
  if (!gallery.length) return;

  container.innerHTML = '';

  gallery.forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'gallery-item';
    el.style.animationDelay = `${index * 100}ms`;

    el.innerHTML = `
      <div class="gallery-images">
        <img src="${item.afterImage}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="gallery-overlay">
        <h3>${item.title}</h3>
        <span>${item.service}</span>
      </div>
    `;

    el.addEventListener('click', () => {
      window.location.href = `/project-details.html?gallery=${item.id}`;
    });

    container.appendChild(el);
  });
}
