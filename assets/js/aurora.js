// Aurora Interactive Effect
// Makes the aurora layers respond to mouse movement for a parallax effect

document.addEventListener('DOMContentLoaded', function() {
  const auroraContainer = document.getElementById('aurora-background');
  if (!auroraContainer) return;

  const layers = auroraContainer.querySelectorAll('.aurora-layer');
  if (layers.length === 0) return;

  // Configure each layer's speed and depth
  const layerConfigs = [
    { speed: 0.02, depth: 0.1 },
    { speed: 0.03, depth: 0.2 },
    { speed: 0.01, depth: 0.3 },
    { speed: 0.04, depth: 0.4 }
  ];

  // Handle mouse movement
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5; // -0.5 to 0.5
    const mouseY = e.clientY / window.innerHeight - 0.5; // -0.5 to 0.5

    layers.forEach((layer, index) => {
      const config = layerConfigs[index] || { speed: 0.02, depth: 0.1 };
      const moveX = mouseX * config.speed * 100; // adjust multiplier for strength
      const moveY = mouseY * config.speed * 100;

      // Apply transform
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`;

      // Optional: adjust opacity based on distance from center
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const opacity = 0.15 + (0.1 * (1 - distance * 2)); // adjust as needed
      layer.style.opacity = opacity;
    });
  });

  // Optional: reset on mouse leave
  document.addEventListener('mouseleave', () => {
    layers.forEach(layer => {
      layer.style.transform = 'translate(0px, 0px)';
      layer.style.opacity = '0.15';
    });
  });
});
