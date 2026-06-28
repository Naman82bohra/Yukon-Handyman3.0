/* ============================================
   Yukon Handyman 3.0 — Custom Cursor
   ============================================ */

export function initCustomCursor() {
  if (window.innerWidth < 768) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
  document.body.appendChild(cursor);

  const dot = cursor.querySelector('.cursor-dot');
  const ring = cursor.querySelector('.cursor-ring');

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  // Smooth ring follow
  function animate() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    
    requestAnimationFrame(animate);
  }

  animate();

  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, .btn, .service-card, .project-card, .service-hotspot, .magnetic-wrap'
  );

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('cursor-hover');
    });

    el.addEventListener('mouseleave', () => {
      ring.classList.remove('cursor-hover');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });
}
