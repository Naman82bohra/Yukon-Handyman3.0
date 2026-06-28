/* ============================================
   Yukon Handyman 3.0 — Navigation
   ============================================ */

export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('navbar-hamburger');
  const menu = document.getElementById('navbar-menu');
  const searchToggle = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');

  if (!navbar) return;

  // Hamburger toggle
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      menu.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });
  }

  // Close menu on link click
  menu?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      menu?.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  });

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide/show on scroll direction
    if (currentScroll > lastScroll && currentScroll > 200) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // Search toggle
  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', () => {
      searchOverlay.classList.toggle('open');
      const input = searchOverlay.querySelector('.search-input');
      if (input) setTimeout(() => input.focus(), 100);
    });
  }

  // Close search on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hamburger?.classList.remove('active');
      menu?.classList.remove('open');
      searchOverlay?.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  });
}
