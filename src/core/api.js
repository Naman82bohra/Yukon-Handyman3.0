/* ============================================
   Yukon Handyman 3.0 — API Layer
   ============================================ */

import { API } from './constants.js';

class ApiService {
  async fetch(url, options = {}) {
    const config = {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`[YH API] ${error.message}`);
      throw error;
    }
  }

  async sendEmail(templateParams) {
    const { default: emailjs } = await import('@emailjs/browser');
    emailjs.init(API.EMAILJS_PUBLIC_KEY);
    return emailjs.send(
      API.EMAILJS_SERVICE_ID,
      API.EMAILJS_TEMPLATE_ID,
      templateParams
    );
  }

  async submitContact(data) {
    return this.sendEmail({
      to_name: 'Yukon Handyman',
      from_name: data.name,
      from_email: data.email,
      subject: data.subject || 'New Contact Form Submission',
      message: data.message,
      phone: data.phone || '',
    });
  }

  async submitQuote(data) {
    return this.sendEmail({
      to_name: 'Yukon Handyman',
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      service: data.service,
      message: data.message || '',
      property_size: data.propertySize || '',
      timeline: data.timeline || '',
    });
  }

  async submitApplication(data) {
    return this.sendEmail({
      to_name: 'Yukon Handyman',
      from_name: data.fullName,
      from_email: data.email,
      phone: data.phone,
      position: data.position,
      experience: data.experience,
      message: data.message || '',
    });
  }

  async getWeather(city = 'Whitehorse') {
    const url = `${API.WEATHER_API_URL}/weather?q=${city},yt,ca&appid=${API.WEATHER_API_KEY}&units=metric`;
    return this.fetch(url);
  }

  async getWeatherForecast(city = 'Whitehorse') {
    const url = `${API.WEATHER_API_URL}/forecast?q=${city},yt,ca&appid=${API.WEATHER_API_KEY}&units=metric`;
    return this.fetch(url);
  }
}

export const api = new ApiService();
