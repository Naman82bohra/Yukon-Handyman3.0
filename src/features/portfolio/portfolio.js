/* ============================================
   Yukon Handyman 3.0 — Portfolio Module
   ============================================ */

import { loadJSON } from '../../core/helpers.js';
import { appConfig } from '../../config/app.config.js';

export async function initPortfolioGrid() {
  const container = document.querySelector('.projects-grid');
  if (!container) return;

  const projects = await loadJSON(appConfig.data.projects);
  if (!projects.length) return;

  container.innerHTML = '';

  projects.forEach((project, index) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${index * 100}ms`;
    card.dataset.service = project.service.toLowerCase();

    const image = project.images?.[0] || '/assets/images/projects/placeholder.jpg';

    card.innerHTML = `
      <img src="${image}" alt="${project.title}" loading="lazy" />
      <div class="project-card-overlay">
        <span class="project-card-category">${project.service}</span>
        <h3 class="project-card-title">${project.title}</h3>
        <span class="text-xs" style="color: var(--color-gray-400);">${project.location}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      window.location.href = `/project-details.html?project=${project.slug}`;
    });

    container.appendChild(card);
  });
}

export async function initPortfolioPage() {
  await initPortfolioGrid();

  const filters = document.querySelectorAll('.portfolio-filter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        if (filter === 'all' || card.dataset.service === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
