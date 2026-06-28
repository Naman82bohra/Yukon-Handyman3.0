/* ============================================
   Yukon Handyman 3.0 — Services Module
   ============================================ */

import { loadJSON, createElement } from '../../core/helpers.js';
import { appConfig } from '../../config/app.config.js';

export async function initServicesGrid() {
  const container = document.querySelector('.services-grid');
  if (!container) return;

  const services = await loadJSON(appConfig.data.services);
  if (!services.length) return;

  container.innerHTML = '';

  services.forEach((service, index) => {
    const card = createElement('div', {
      className: 'service-card',
      style: `animation-delay: ${index * 100}ms`,
      'data-service': service.slug,
    });

    card.innerHTML = `
      <div class="service-card-icon">${service.icon || '🔧'}</div>
      <h3 class="service-card-title">${service.title}</h3>
      <p class="service-card-text">${service.tagline}</p>
      <p class="service-card-text">${service.description.slice(0, 120)}...</p>
      <div class="flex items-center gap-2" style="margin-top: auto;">
        <span class="text-sm text-gold font-medium">Learn more</span>
        <span class="service-card-arrow">→</span>
      </div>
    `;

    card.addEventListener('click', () => {
      window.location.href = `/service-details.html?service=${service.slug}`;
    });

    container.appendChild(card);
  });
}

export async function initServicesPage() {
  await initServicesGrid();

  // Filter buttons
  const filters = document.querySelectorAll('.service-filter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.service-card').forEach(card => {
        if (filter === 'all' || card.dataset.service === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
