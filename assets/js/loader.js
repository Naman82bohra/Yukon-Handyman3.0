/* ============================================
   Yukon Handyman 3.0 — Preloader
   Smooth, robust loading progress with
   real page-load tracking and fallback timeout.
   ============================================ */

export function initLoader() {
  // --- DOM refs -----------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const percentageEl = document.getElementById('preloader-percentage');
  const barFill = document.querySelector('.preloader-bar-fill');

  if (!preloader) {
    console.warn('[YH] Preloader element (#preloader) not found — skipping.');
    return;
  }

  // --- State --------------------------------------------------------------
  let displayProgress = 0;          // smoothly animated value (0‑100)
  let isComplete = false;           // guards against double-completion
  let rafId = null;                 // requestAnimationFrame handle
  let windowLoaded = false;         // true after window 'load' fires

  const START_TIME = performance.now();
  const MIN_DURATION = 600;         // show preloader at least 0.6 s
  const MAX_DURATION = 2000;        // force-complete after 2.0 s
  const TARGET_DURATION = 800;      // simulated progress reaches 95 % in ~0.8 s

  // --- Listen for the real page-load event --------------------------------
  // Once the browser fires 'load' (all assets: images, styles, fonts, etc.)
  // AND the minimum display time has elapsed, we go to 100 %.
  window.addEventListener('load', () => {
    windowLoaded = true;
  });

  // --- Easing helpers -----------------------------------------------------
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // --- Animation loop -----------------------------------------------------
  function animate(now) {
    if (isComplete) return;

    const elapsed = now - START_TIME;

    // 1) Simulated base progress (reaches ~95 % after TARGET_DURATION)
    const rawT = Math.min(elapsed / TARGET_DURATION, 1);
    const simulated = easeOutCubic(rawT) * 95;

    // 2) Determine the target progress for this frame
    let target;

    if (windowLoaded && elapsed >= MIN_DURATION) {
      // Real load complete + minimum display time met → snap to 100 %
      target = 100;
    } else if (elapsed >= MAX_DURATION) {
      // Safety timeout → force-complete
      target = 100;
    } else {
      // Normal: ease simulated progress
      target = simulated;
    }

    // 3) Smoothly interpolate display toward target (low-pass filter)
    displayProgress += (target - displayProgress) * 0.25;

    // Clamp and round
    const display = Math.min(Math.round(displayProgress), 100);

    // 4) Update DOM
    if (percentageEl) {
      percentageEl.textContent = `${display}%`;
    }
    if (barFill) {
      barFill.style.width = `${display}%`;
    }

    // 5) Check completion
    if (display >= 100 && elapsed >= MIN_DURATION) {
      isComplete = true;
      complete(preloader);
      return;
    }

    // Continue the loop
    rafId = requestAnimationFrame(animate);
  }

  // --- Fade-out sequence --------------------------------------------------
  function complete(preloaderEl) {
    // Snap to 100 % one final time
    if (percentageEl) percentageEl.textContent = '100%';
    if (barFill) barFill.style.width = '100%';

    // Brief pause so the user can see "100 %"
    const fadeDelay = 100;

    setTimeout(() => {
      if (!preloaderEl) return;

      // Remove scroll lock
      document.body.classList.remove('no-scroll');

      // Trigger CSS fade-out
      preloaderEl.classList.add('preloader-fade');

      // After the CSS transition finishes, remove from flow
      setTimeout(() => {
        preloaderEl.style.display = 'none';
        if (rafId) cancelAnimationFrame(rafId);
      }, 500);
    }, fadeDelay);
  }

  // --- Boot ---------------------------------------------------------------
  // Prevent background scrolling while the preloader is visible
  document.body.classList.add('no-scroll');

  // Start the smooth animation loop
  rafId = requestAnimationFrame(animate);
}
