import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        index: 'index.html',
        services: 'services.html',
        'service-details': 'service-details.html',
        projects: 'projects.html',
        'project-details': 'project-details.html',
        about: 'about.html',
        contact: 'contact.html',
        careers: 'careers.html',
        reviews: 'reviews.html',
        quote: 'quote.html',
        financing: 'financing.html',
        privacy: 'privacy.html',
        terms: 'terms.html',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
