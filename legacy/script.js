/**
 * GUHAN MURUGAIYAN — MOTION & INTERACTION ENGINE
 * Replicating Exact Video Reference Behaviors & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. PRELOADER & SPLIT REVEAL (Video 00:00 - 00:14)
  // ==========================================================================
  const preloader = document.getElementById('preloader');
  const loaderPct = document.getElementById('loaderPct');
  const loaderRing = document.getElementById('loaderRing');
  const loaderCircleWrap = document.getElementById('loaderCircleWrap');
  const preloaderHello = document.getElementById('preloaderHello');
  const body = document.body;

  const totalDash = 427.26; // 2 * PI * 68
  let currentPct = 0;

  // Realistic milestone percentage increments from video
  const milestones = [0, 13, 27, 45, 55, 72, 88, 91, 99, 100];
  let milestoneIndex = 0;

  function runPreloader() {
    if (milestoneIndex < milestones.length) {
      currentPct = milestones[milestoneIndex];
      milestoneIndex++;

      // Update text & ring offset
      loaderPct.textContent = `${currentPct}%`;
      const offset = totalDash - (totalDash * (currentPct / 100));
      loaderRing.style.strokeDashoffset = offset;

      // Variable speed resembling authentic asset loading
      let delay = 120 + Math.random() * 140;
      if (currentPct === 99) delay = 350; // Pause suspense before 100%
      if (currentPct === 100) {
        setTimeout(finishPreloader, 400);
        return;
      }

      setTimeout(runPreloader, delay);
    }
  }

  function finishPreloader() {
    // 1. Hide circle counter
    loaderCircleWrap.style.opacity = '0';
    loaderCircleWrap.style.transform = 'scale(0.8)';

    // 2. Draw/show cursive "hello"
    setTimeout(() => {
      preloaderHello.classList.add('show');

      // 3. Open curtains & unveil site
      setTimeout(() => {
        preloader.classList.add('completed');
        body.classList.remove('loading-state');

        // 4. Clean up preloader from DOM
        setTimeout(() => {
          preloader.classList.add('vanished');
        }, 900);
      }, 700);
    }, 250);
  }

  // Start preloader immediately
  setTimeout(runPreloader, 200);

  // ==========================================================================
  // 2. CUSTOM CURSOR & SMOOTH FOLLOWER
  // ==========================================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover magnification for interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .tech-bubble, .expertise-card, .stack-card, .cert-item, .contact-card-btn, .circular-badge-btn');
  hoverTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
    target.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
  });

  // ==========================================================================
  // 3. THEME TRANSITION ON SCROLL (Cream Hero -> Dark Sections)
  // ==========================================================================
  const aboutSection = document.getElementById('about');

  function checkThemeScroll() {
    if (!aboutSection) return;
    const aboutRect = aboutSection.getBoundingClientRect();
    if (aboutRect.top <= 100) {
      body.classList.add('in-dark-mode');
    } else {
      body.classList.remove('in-dark-mode');
    }
  }
  window.addEventListener('scroll', checkThemeScroll, { passive: true });
  checkThemeScroll();

  // ==========================================================================
  // 4. FULL-SCREEN OVERLAY NAVIGATION (Video 00:24)
  // ==========================================================================
  const overlayNav = document.getElementById('overlayNav');
  const navOpenBtn = document.getElementById('navOpenBtn');
  const navCloseBtn = document.getElementById('navCloseBtn');
  const menuLinks = document.querySelectorAll('.menu-link');

  function openMenu() {
    overlayNav.classList.add('active');
  }

  function closeMenu() {
    overlayNav.classList.remove('active');
  }

  if (navOpenBtn) navOpenBtn.addEventListener('click', openMenu);
  if (navCloseBtn) navCloseBtn.addEventListener('click', closeMenu);
  menuLinks.forEach((link) => link.addEventListener('click', closeMenu));

  // ==========================================================================
  // 5. INTERACTIVE BOUNCING & DRAGGABLE TECH SANDBOX (Video 01:00)
  // ==========================================================================
  const sandbox = document.getElementById('sandboxCanvasArea');
  const bubbles = Array.from(document.querySelectorAll('.tech-bubble'));

  if (sandbox && bubbles.length > 0) {
    const sandboxRect = sandbox.getBoundingClientRect();
    
    // Physical state representation
    const bubbleData = bubbles.map((bubble, i) => {
      const bRect = bubble.getBoundingClientRect();
      return {
        el: bubble,
        x: Math.random() * (sandbox.clientWidth - 140) + 20,
        y: Math.random() * (sandbox.clientHeight - 60) + 15,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        width: bRect.width || 120,
        height: bRect.height || 38,
        isDragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0,
      };
    });

    let activeDragItem = null;

    bubbleData.forEach((item) => {
      item.el.addEventListener('mousedown', (e) => {
        activeDragItem = item;
        item.isDragging = true;
        const rect = item.el.getBoundingClientRect();
        item.dragOffsetX = e.clientX - rect.left;
        item.dragOffsetY = e.clientY - rect.top;
        item.vx = 0;
        item.vy = 0;
        item.el.style.zIndex = '50';
      });
    });

    window.addEventListener('mousemove', (e) => {
      if (activeDragItem && activeDragItem.isDragging) {
        const sRect = sandbox.getBoundingClientRect();
        const newX = e.clientX - sRect.left - activeDragItem.dragOffsetX;
        const newY = e.clientY - sRect.top - activeDragItem.dragOffsetY;
        activeDragItem.vx = (newX - activeDragItem.x) * 0.4;
        activeDragItem.vy = (newY - activeDragItem.y) * 0.4;
        activeDragItem.x = newX;
        activeDragItem.y = newY;
      }
    });

    window.addEventListener('mouseup', () => {
      if (activeDragItem) {
        activeDragItem.isDragging = false;
        activeDragItem.el.style.zIndex = '1';
        activeDragItem = null;
      }
    });

    function physicsLoop() {
      const maxX = sandbox.clientWidth;
      const maxY = sandbox.clientHeight;

      bubbleData.forEach((item) => {
        if (!item.isDragging) {
          item.x += item.vx;
          item.y += item.vy;

          // Boundary bounce with damping
          if (item.x <= 0) {
            item.x = 0;
            item.vx = -item.vx * 0.85;
          } else if (item.x + item.width >= maxX) {
            item.x = maxX - item.width;
            item.vx = -item.vx * 0.85;
          }

          if (item.y <= 0) {
            item.y = 0;
            item.vy = -item.vy * 0.85;
          } else if (item.y + item.height >= maxY) {
            item.y = maxY - item.height;
            item.vy = -item.vy * 0.85;
          }

          // Ambient micro-drift so bubbles never stop completely
          if (Math.abs(item.vx) < 0.2) item.vx += (Math.random() - 0.5) * 0.3;
          if (Math.abs(item.vy) < 0.2) item.vy += (Math.random() - 0.5) * 0.3;
        }

        item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0)`;
      });

      requestAnimationFrame(physicsLoop);
    }
    physicsLoop();
  }

  // ==========================================================================
  // 6. ONE-CLICK EMAIL COPY WITH TOAST
  // ==========================================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');
  const copyIcon = document.getElementById('copyIcon');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'mguhan6383@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (copyIcon) {
          copyIcon.classList.remove('fa-copy');
          copyIcon.classList.add('fa-check');
        }
        toast.classList.add('show');

        setTimeout(() => {
          toast.classList.remove('show');
          if (copyIcon) {
            copyIcon.classList.remove('fa-check');
            copyIcon.classList.add('fa-copy');
          }
        }, 2500);
      });
    });
  }

  // ==========================================================================
  // 7. CONTACT FORM SUBMISSION FEEDBACK
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = `<span>Message Sent!</span> <i class="fa-solid fa-circle-check"></i>`;
        submitBtn.style.background = 'var(--accent-emerald)';
        submitBtn.style.color = '#000';
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 4000);
      }, 1200);
    });
  }
});
