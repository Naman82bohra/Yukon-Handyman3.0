/* ============================================
   Yukon Handyman 3.0 — Quote Form Module
   ============================================ */

import { api } from '../../core/api.js';
import { loadJSON } from '../../core/helpers.js';
import { appConfig } from '../../config/app.config.js';

export function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const serviceSelect = form.querySelector('#quote-service');
  const submitBtn = form.querySelector('button[type="submit"]');
  const successEl = form.querySelector('.form-success');

  // Load services into dropdown
  loadJSON(appConfig.data.services).then(services => {
    if (serviceSelect && services.length) {
      serviceSelect.innerHTML = '<option value="">Select a service</option>' +
        services.map(s => `<option value="${s.title}">${s.title}</option>`).join('');
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;

    const data = {
      name: form['quote-name'].value,
      email: form['quote-email'].value,
      phone: form['quote-phone'].value,
      service: form['quote-service'].value,
      message: form['quote-message']?.value || '',
      propertySize: form['quote-property-size']?.value || '',
      timeline: form['quote-timeline']?.value || '',
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';

    try {
      await api.submitQuote(data);
      form.reset();
      if (successEl) successEl.classList.add('show');
      submitBtn.textContent = 'Request Sent ✓';
      setTimeout(() => {
        submitBtn.textContent = 'Get Free Estimate';
        submitBtn.disabled = false;
        if (successEl) successEl.classList.remove('show');
      }, 4000);
    } catch (error) {
      submitBtn.textContent = 'Failed — Try Again';
      submitBtn.disabled = false;
    }
  });
}

export function initQuotePage() {
  initQuoteForm();
  initQuoteEstimator();
}

export function initQuoteEstimator() {
  const estimator = document.querySelector('.quote-estimator');
  if (!estimator) return;

  const serviceSelect = estimator.querySelector('#estimator-service');
  const sizeInput = estimator.querySelector('#estimator-size');
  const estimateBtn = estimator.querySelector('#estimator-calculate');
  const resultEl = estimator.querySelector('.estimator-result');

  loadJSON(appConfig.data.services).then(services => {
    if (serviceSelect && services.length) {
      serviceSelect.innerHTML = '<option value="">Select service</option>' +
        services.map(s => `<option value="${s.title}">${s.title}</option>`).join('');
    }
  });

  if (estimateBtn) {
    estimateBtn.addEventListener('click', () => {
      const service = serviceSelect?.value;
      const size = parseFloat(sizeInput?.value) || 0;
      
      if (!service || !size) {
        if (resultEl) {
          resultEl.innerHTML = '<p class="text-sm" style="color: var(--color-error);">Please select a service and enter the square footage.</p>';
        }
        return;
      }

      // Simple estimate calculation
      const baseRates = {
        'Renovation': 150,
        'Roofing': 8,
        'Flooring': 6,
        'Snow Removal': 200,
        'Cleaning': 0.50,
        'General Handyman': 100,
      };

      const rate = baseRates[service] || 100;
      const estimate = rate * size;
      const rangeLow = Math.round(estimate * 0.9);
      const rangeHigh = Math.round(estimate * 1.15);

      if (resultEl) {
        resultEl.innerHTML = `
          <div class="estimator-result-value">
            <span class="text-sm" style="color: var(--color-gray-400);">Estimated Range</span>
            <span class="text-3xl font-bold text-gradient-gold">$${rangeLow.toLocaleString()} – $${rangeHigh.toLocaleString()}</span>
            <span class="text-sm" style="color: var(--color-gray-500);">For ${service} • ${size.toLocaleString()} sq ft</span>
          </div>
          <p class="text-xs mt-4" style="color: var(--color-gray-500);">
            This is a preliminary estimate. Request a free detailed quote for an accurate price.
          </p>
        `;
        resultEl.classList.add('show');
      }
    });
  }
}
