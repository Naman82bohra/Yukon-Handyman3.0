/* ============================================
   Yukon Handyman 3.0 — Rating Module
   ============================================ */

export function renderStars(rating, size = 'md') {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  
  const sizes = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl' };
  const className = sizes[size] || sizes.md;
  
  return `<span class="${className}" style="color: var(--color-gold-500);">
    ${'★'.repeat(full)}${hasHalf ? '½' : ''}${'☆'.repeat(empty)}
  </span>`;
}

export function calculateAverage(reviews) {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.length;
}

export function getRatingDistribution(reviews) {
  const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    if (dist[r.rating] !== undefined) dist[r.rating]++;
  });
  return dist;
}
