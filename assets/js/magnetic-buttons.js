/* ============================================
   Yukon Handyman 3.0 — Magnetic Buttons
   ============================================ */

export function initMagneticButtons() {
  const magnets = document.querySelectorAll('.magnetic-wrap');

  magnets.forEach(magnet => {
    const target = magnet.querySelector('.magnetic-target') || magnet;

    magnet.addEventListener('mousemove', (e) => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const strength = 0.3;
      target.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    magnet.addEventListener('mouseleave', () => {
      target.style.transform = 'translate(0, 0)';
      target.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      
      setTimeout(() => {
        target.style.transition = '';
      }, 300);
    });
  });
}
