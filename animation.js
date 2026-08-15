// ===============================
// GLOBAL PREMIUM ANIMATION ENGINE
// ===============================

(function () {

  // ===============================
  // SETTINGS (TUNE IF NEEDED)
  // ===============================
  const CONFIG = {
    revealDistance: 40,
    duration: 0.8,
    ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
    stagger: 0.08
  };


  // ===============================
  // INITIAL STATE (PREVENT FLASH)
  // ===============================
  document.documentElement.classList.add('js-ready');


  // ===============================
  // SELECT ELEMENTS
  // ===============================
  const elements = document.querySelectorAll(`
    .section-title,
    .class-card,
    .class-desc,
    .class-level,
    nav,
    footer,
    img
  `);


  // ===============================
  // APPLY BASE STYLES (GPU SAFE)
  // ===============================
  elements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = `translateY(${CONFIG.revealDistance}px)`;
    el.style.willChange = "transform, opacity";
    el.dataset.delay = index * CONFIG.stagger;
  });


  // ===============================
  // INTERSECTION OBSERVER
  // ===============================
  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const el = entry.target;

        el.style.transition = `
          transform ${CONFIG.duration}s ${CONFIG.ease} ${el.dataset.delay}s,
          opacity ${CONFIG.duration}s ${CONFIG.ease} ${el.dataset.delay}s
        `;

        el.style.opacity = "1";
        el.style.transform = "translateY(0)";

        observer.unobserve(el);
      }

    });

  }, {
    threshold: 0.1
  });


  elements.forEach(el => observer.observe(el));


  // ===============================
  // PAGE LOAD SMOOTH ENTRANCE
  // ===============================
  window.addEventListener("load", () => {

    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.6s ease";

    requestAnimationFrame(() => {
      document.body.style.opacity = "1";
    });

  });


  // ===============================
  // PARALLAX (SUBTLE PREMIUM FEEL)
  // ===============================
  const parallaxEls = document.querySelectorAll(".ghost-bg");

  window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    parallaxEls.forEach(el => {
      el.style.transform = `translateY(${scrollY * 0.15}px)`;
    });

  });


  // ===============================
  // HOVER LIFT (CARDS)
  // ===============================
  const cards = document.querySelectorAll(".class-card");

  cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.3s ease";
      card.style.transform = "translateY(-6px) scale(1.01)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });

  });

})();