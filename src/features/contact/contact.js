/* ============================================
   Yukon Handyman 3.0 — Contact Module
   ============================================ */

import { api } from '../../core/api.js';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const successEl = form.querySelector('.form-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;

    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone?.value || '',
      subject: form.subject?.value || 'New Contact Form Submission',
      message: form.message.value,
    };

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

    try {
      await api.submitContact(data);
      form.reset();
      if (successEl) successEl.classList.add('show');
      submitBtn.textContent = 'Message Sent ✓';
      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        if (successEl) successEl.classList.remove('show');
      }, 4000);
    } catch (error) {
      submitBtn.textContent = 'Failed — Try Again';
      submitBtn.disabled = false;
    }
  });
}

export function initContactPage() {
  initContactForm();
}
