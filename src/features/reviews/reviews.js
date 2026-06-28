/* ============================================
   Yukon Handyman 3.0 — Reviews Module
   ============================================ */

import { loadJSON, generateStars } from '../../core/helpers.js';
import { appConfig } from '../../config/app.config.js';

export async function initReviewsGrid() {
  const container = document.querySelector('.reviews-grid');
  if (!container) return;

  const reviews = await loadJSON(appConfig.data.reviews);
  if (!reviews.length) return;

  container.innerHTML = '';

  reviews.forEach((review, index) => {
    const card = document.createElement('div');
    card.className = 'review-card animate-fadeInUp';
    card.style.animationDelay = `${index * 100}ms`;

    const initials = review.customerName
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2);

    card.innerHTML = `
      <div class="review-card-stars">
        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
      </div>
      <p class="review-card-text">"${review.text}"</p>
      <div class="review-card-author">
        <div class="review-card-avatar">${initials}</div>
        <div>
          <div class="review-card-name">${review.customerName}</div>
          <div class="review-card-source">${review.source}</div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

export async function initReviewsPage() {
  await initReviewsGrid();

  // Rating filter
  const filters = document.querySelectorAll('.review-filter');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// Testimonials carousel
export async function initTestimonials() {
  const container = document.querySelector('.testimonials-track');
  if (!container) return;

  const testimonials = await loadJSON(appConfig.data.testimonials);
  if (!testimonials.length) return;

  container.innerHTML = testimonials.map(t => `
    <div class="testimonial-slide">
      <div class="review-card">
        <div class="review-card-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
        <p class="review-card-text">"${t.text}"</p>
        <div class="review-card-author">
          <div class="review-card-avatar">${t.customerName.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
          <div>
            <div class="review-card-name">${t.customerName}</div>
            <div class="review-card-source">${t.source}</div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}
