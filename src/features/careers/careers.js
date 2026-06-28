/* ============================================
   Yukon Handyman 3.0 — Careers Module
   ============================================ */

import { api } from '../../core/api.js';

export function initCareersForm() {
  const form = document.getElementById('careers-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const successEl = form.querySelector('.form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;

    const data = {
      fullName: form['careers-name'].value,
      email: form['careers-email'].value,
      phone: form['careers-phone'].value,
      position: form['careers-position'].value,
      experience: form['careers-experience'].value,
      message: form['careers-message']?.value || '',
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Submitting...';

    try {
      await api.submitApplication(data);
      form.reset();
      if (successEl) successEl.classList.add('show');
      submitBtn.textContent = 'Application Submitted ✓';
      setTimeout(() => {
        submitBtn.textContent = 'Submit Application';
        submitBtn.disabled = false;
        if (successEl) successEl.classList.remove('show');
      }, 4000);
    } catch {
      submitBtn.textContent = 'Failed — Try Again';
      submitBtn.disabled = false;
    }
  });
}

export function initCareersPage() {
  initCareersForm();
}
