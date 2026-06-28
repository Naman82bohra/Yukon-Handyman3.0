/* ============================================
   Yukon Handyman 3.0 — Storage
   ============================================ */

import { STORAGE_KEYS } from './constants.js';

class Storage {
  get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  getTheme() {
    return this.get(STORAGE_KEYS.THEME) || 'dark';
  }

  setTheme(theme) {
    this.set(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  getRecentSearches() {
    return this.get(STORAGE_KEYS.RECENT_SEARCHES) || [];
  }

  addRecentSearch(query) {
    const searches = this.getRecentSearches();
    const filtered = searches.filter(s => s.toLowerCase() !== query.toLowerCase());
    filtered.unshift(query);
    this.set(STORAGE_KEYS.RECENT_SEARCHES, filtered.slice(0, 10));
  }
}

export const storage = new Storage();
