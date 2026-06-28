/* ============================================
   Yukon Handyman 3.0 — Map Module
   ============================================ */

import { API } from '../../core/constants.js';

export function initMap() {
  const container = document.getElementById('map-container');
  if (!container || !API.GOOGLE_MAPS_KEY) return;

  // Placeholder map with a static image
  const lat = 60.7212;
  const lng = -135.0568;
  
  container.innerHTML = `
    <div class="map-placeholder">
      <div class="map-marker">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--color-gold-500)">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
      <div class="map-info glass">
        <p class="font-semibold text-white">Yukon Handyman</p>
        <p class="text-sm" style="color: var(--color-gray-400);">Whitehorse, Yukon</p>
        <a href="https://maps.google.com/?q=Yukon+Handyman+Whitehorse" 
           target="_blank" rel="noopener noreferrer"
           class="btn btn-sm btn-primary mt-4">
          Open in Google Maps
        </a>
      </div>
    </div>
  `;
}
