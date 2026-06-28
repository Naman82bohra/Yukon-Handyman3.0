/* ============================================
   Yukon Handyman 3.0 — Before/After Module
   ============================================ */

import { loadJSON } from '../../core/helpers.js';
import { appConfig } from '../../config/app.config.js';

export async function initBeforeAfter() {
  const container = document.querySelector('.before-after-grid');
  if (!container) return;

  const gallery = await loadJSON(appConfig.data.gallery);
  if (!gallery.length) return;

  container.innerHTML = '';

  gallery.filter(item => item.featured).forEach((item, index) => {
    const el = document.createElement('div');
    el.className = 'before-after-card';
    el.style.animationDelay = `${index * 150}ms`;

    el.innerHTML = `
      <div class="before-after-compare">
        <div class="before-image">
          <img src="${item.beforeImage}" alt="${item.title} — Before" loading="lazy" />
          <span class="before-after-label">Before</span>
        </div>
        <div class="after-image">
          <img src="${item.afterImage}" alt="${item.title} — After" loading="lazy" />
          <span class="before-after-label after">After</span>
        </div>
        <div class="before-after-handle">
          <span class="before-after-handle-icon">↔</span>
        </div>
      </div>
      <div class="before-after-info">
        <h3 class="before-after-title">${item.title}</h3>
        <span class="before-after-service">${item.service}</span>
      </div>
    `;

    container.appendChild(el);

    // Simple drag slider
    const compare = el.querySelector('.before-after-compare');
    const before = el.querySelector('.before-image');
    const handle = el.querySelector('.before-after-handle');
    let isDragging = false;

    const updateSlider = (x) => {
      const rect = compare.getBoundingClientRect();
      const pos = Math.max(0, Math.min(1, (x - rect.left) / rect.width));
      before.style.clipPath = `inset(0 ${(1 - pos) * 100}% 0 0)`;
      handle.style.left = `${pos * 100}%`;
    };

    handle.addEventListener('mousedown', () => isDragging = true);
    handle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('mousemove', (e) => { if (isDragging) updateSlider(e.clientX); });
    window.addEventListener('touchmove', (e) => { if (isDragging) updateSlider(e.touches[0].clientX); });
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('touchend', () => isDragging = false);

    // Init at 50%
    setTimeout(() => updateSlider(compare.getBoundingClientRect().left + rectWidth(compare) / 2), 100);
  });
}

function rectWidth(el) {
  return el.getBoundingClientRect().width;
}
