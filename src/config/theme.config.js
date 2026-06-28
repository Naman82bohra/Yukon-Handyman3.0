/* ============================================
   Yukon Handyman 3.0 — Theme Configuration
   ============================================ */

export const themeConfig = {
  default: 'dark',

  themes: {
    dark: {
      name: 'Dark',
      colors: {
        background: '#0a0a0b',
        surface: '#121214',
        text: '#f5f5f7',
        accent: '#c9952e',
      },
    },
    light: {
      name: 'Light',
      colors: {
        background: '#f5f5f7',
        surface: '#ffffff',
        text: '#1a1a1e',
        accent: '#b07f1a',
      },
    },
  },

  aurora: {
    enabled: true,
    opacity: 0.15,
    speed: 1,
    colors: ['#00ff88', '#00d4ff', '#7b2ff7'],
  },

  particles: {
    enabled: true,
    count: 50,
    speed: 0.5,
    color: '#ffffff',
    opacity: 0.3,
    size: { min: 1, max: 3 },
  },
};
