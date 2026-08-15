/* ============================================================
   DE IMAGE MAGAZINE
   PREMIUM HOMEPAGE INTERACTION ENGINE
   ============================================================ */

(() => {
  "use strict";

  /* ==========================================================
     DOM HELPERS
     ========================================================== */

  const $ = (selector, scope = document) => {
    return scope.querySelector(selector);
  };

  const $$ = (selector, scope = document) => {
    return Array.from(scope.querySelectorAll(selector));
  };

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* ==========================================================
     GLOBAL STATE
     ========================================================== */

  let scrollTicking = false;
  let galleryDragging = false;

  let galleryStartX = 0;
  let galleryStartScroll = 0;

  let lastScrollY = window.scrollY;


  /* ==========================================================
     ELEMENT REFERENCES
     ========================================================== */

  const hero = $(".hero");

  const parallaxColumns = $$(".parallax-col");

  const gallery = $("#galleryStrip");

  const gallerySection = $(".gallery-strip");

  const galleryInner = $(".gallery-strip-inner");

  const subscribeButton = $("#subBtn");

  const emailInput = $("#emailInput");

  const subscribeForm = $("#subForm");

  const successMessage = $("#successMsg");

  const articleCards = $$(".class-card");

  const sections = $$(
    ".section-classes, .section-vibes, .section-subscribe"
  );


  /* ==========================================================
     PAGE READY STATE
     ========================================================== */

  document.documentElement.classList.add("js-enabled");

  window.requestAnimationFrame(() => {
    document.body.classList.add("page-ready");
  });


  /* ==========================================================
     HERO PARALLAX
     ========================================================== */

  function updateParallax() {
    if (!hero || prefersReducedMotion) {
      scrollTicking = false;
      return;
    }

    const scrollY = window.scrollY || window.pageYOffset || 0;

    const heroHeight = hero.offsetHeight || window.innerHeight;

    /*
      Stop processing the hero once the user is far enough
      below it. This keeps scrolling lightweight.
    */

    if (scrollY > heroHeight * 1.25) {
      parallaxColumns.forEach((column) => {
        column.style.transform = "";
      });

      scrollTicking = false;
      return;
    }

    parallaxColumns.forEach((column, index) => {
      const configuredSpeed = parseFloat(
        column.dataset.speed
      );

      const speed = Number.isFinite(configuredSpeed)
        ? configuredSpeed
        : 0.3;

      /*
        Alternate direction very slightly to make the
        editorial image wall feel more organic.
      */

      const direction = index % 2 === 0 ? 1 : -1;

      const offset =
        scrollY *
        speed *
        0.55 *
        direction;

      column.style.transform =
        `translate3d(0, ${offset}px, 0)`;
    });

    scrollTicking = false;
  }


  /* ==========================================================
     GALLERY PARALLAX
     ========================================================== */

  function updateGalleryParallax() {
    if (
      !galleryInner ||
      !gallerySection ||
      prefersReducedMotion
    ) {
      return;
    }

    const rect =
      gallerySection.getBoundingClientRect();

    /*
      Do not perform expensive transforms when the gallery
      is completely outside the viewport.
    */

    if (
      rect.bottom < -100 ||
      rect.top > window.innerHeight + 100
    ) {
      return;
    }

    const viewportCenter =
      window.innerHeight / 2;

    const galleryCenter =
      rect.top + rect.height / 2;

    const distance =
      galleryCenter - viewportCenter;

    const shift =
      distance * 0.10;

    galleryInner.style.transform =
      `translate3d(${-shift}px, 0, 0)`;
  }


  /* ==========================================================
     COMBINED SCROLL ENGINE
     ========================================================== */

  function updateScrollEffects() {
    updateParallax();
    updateGalleryParallax();

    lastScrollY =
      window.scrollY ||
      window.pageYOffset ||
      0;
  }


  function requestScrollUpdate() {
    if (scrollTicking) {
      return;
    }

    scrollTicking = true;

    window.requestAnimationFrame(
      updateScrollEffects
    );
  }


  window.addEventListener(
    "scroll",
    requestScrollUpdate,
    {
      passive: true
    }
  );


  /* ==========================================================
     INITIAL PARALLAX POSITION
     ========================================================== */

  window.requestAnimationFrame(() => {
    updateParallax();
    updateGalleryParallax();
  });


  /* ==========================================================
     GALLERY DRAG SCROLL
     ========================================================== */

  /*
    The original implementation assumed that the gallery
    element itself was the scrolling container.

    This version detects the actual horizontal scrolling
    element and works with both legacy and upgraded markup.
  */

  function getGalleryScroller() {
    if (!gallery) {
      return null;
    }

    if (
      gallery.scrollWidth >
      gallery.clientWidth
    ) {
      return gallery;
    }

    if (
      gallery.parentElement &&
      gallery.parentElement.scrollWidth >
      gallery.parentElement.clientWidth
    ) {
      return gallery.parentElement;
    }

    return gallery;
  }


  const galleryScroller =
    getGalleryScroller();


  if (galleryScroller) {

    galleryScroller.addEventListener(
      "mousedown",
      (event) => {

        galleryDragging = true;

        galleryStartX =
          event.pageX -
          galleryScroller.offsetLeft;

        galleryStartScroll =
          galleryScroller.scrollLeft;

        galleryScroller.classList.add(
          "is-dragging"
        );

        galleryScroller.style.cursor =
          "grabbing";

        event.preventDefault();
      }
    );


    window.addEventListener(
      "mouseup",
      () => {

        if (!galleryDragging) {
          return;
        }

        galleryDragging = false;

        galleryScroller.classList.remove(
          "is-dragging"
        );

        galleryScroller.style.cursor =
          "";
      }
    );


    galleryScroller.addEventListener(
      "mouseleave",
      () => {

        if (!galleryDragging) {
          return;
        }

        galleryDragging = false;

        galleryScroller.classList.remove(
          "is-dragging"
        );

        galleryScroller.style.cursor =
          "";
      }
    );


    galleryScroller.addEventListener(
      "mousemove",
      (event) => {

        if (!galleryDragging) {
          return;
        }

        event.preventDefault();

        const currentX =
          event.pageX -
          galleryScroller.offsetLeft;

        const distance =
          (currentX - galleryStartX) *
          1.35;

        galleryScroller.scrollLeft =
          galleryStartScroll -
          distance;
      }
    );


    /*
      Touch support.
      Native horizontal touch scrolling remains enabled;
      this only adds the dragging class for visual feedback.
    */

    galleryScroller.addEventListener(
      "touchstart",
      () => {
        galleryScroller.classList.add(
          "is-touching"
        );
      },
      {
        passive: true
      }
    );


    galleryScroller.addEventListener(
      "touchend",
      () => {
        galleryScroller.classList.remove(
          "is-touching"
        );
      },
      {
        passive: true
      }
    );

  }


  /* ==========================================================
     SUBSCRIPTION SYSTEM
     ========================================================== */

  function validateEmail(value) {

    /*
      Deliberately lightweight client-side validation.
      Backend validation should still be performed if the
      subscription form is connected to a real endpoint.
    */

    const email =
      String(value || "").trim();

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    );
  }


  function showInvalidEmail() {

    if (!emailInput) {
      return;
    }

    emailInput.setAttribute(
      "aria-invalid",
      "true"
    );

    emailInput.style.borderColor =
      "#b05c52";

    emailInput.style.background =
      "#fdf0eb";

    emailInput.classList.add(
      "input-error"
    );

    window.setTimeout(() => {

      emailInput.style.borderColor =
        "";

      emailInput.style.background =
        "";

      emailInput.classList.remove(
        "input-error"
      );

      emailInput.removeAttribute(
        "aria-invalid"
      );

    }, 1400);
  }


  function showSubscriptionSuccess() {

    if (subscribeForm) {
      subscribeForm.style.display =
        "none";
    }

    if (successMessage) {
      successMessage.style.display =
        "block";

      successMessage.setAttribute(
        "role",
        "status"
      );

      successMessage.setAttribute(
        "aria-live",
        "polite"
      );

      /*
        Small entrance effect without depending
        on an external animation library.
      */

      successMessage.animate(
        [
          {
            opacity: 0,
            transform:
              "translateY(12px)"
          },
          {
            opacity: 1,
            transform:
              "translateY(0)"
          }
        ],
        {
          duration:
            prefersReducedMotion
              ? 0
              : 500,
          easing:
            "cubic-bezier(.22,1,.36,1)",
          fill:
            "forwards"
        }
      );
    }
  }


  function handleSubscription() {

    if (!emailInput) {
      return;
    }

    const value =
      emailInput.value.trim();

    if (!validateEmail(value)) {

      showInvalidEmail();

      emailInput.focus();

      return;
    }

    /*
      Prevent duplicate submissions during the
      transition / future backend integration.
    */

    if (
      subscribeButton &&
      subscribeButton.disabled
    ) {
      return;
    }

    if (subscribeButton) {
      subscribeButton.disabled =
        true;

      subscribeButton.setAttribute(
        "aria-busy",
        "true"
      );

      subscribeButton.dataset.originalText =
        subscribeButton.textContent;

      subscribeButton.textContent =
        "SUBSCRIBING...";
    }

    /*
      Current homepage behavior is UI-only.
      This is intentionally isolated so a real
      subscription API can be connected here later.
    */

    window.setTimeout(() => {

      showSubscriptionSuccess();

      if (subscribeButton) {
        subscribeButton.disabled =
          false;

        subscribeButton.removeAttribute(
          "aria-busy"
        );

        subscribeButton.textContent =
          subscribeButton.dataset.originalText ||
          "SUBSCRIBE";
      }

    }, prefersReducedMotion ? 0 : 450);
  }


  if (subscribeButton) {

    subscribeButton.addEventListener(
      "click",
      handleSubscription
    );

  }


  if (emailInput) {

    emailInput.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Enter") {

          event.preventDefault();

          handleSubscription();
        }

      }
    );


    emailInput.addEventListener(
      "input",
      () => {

        emailInput.removeAttribute(
          "aria-invalid"
        );

        emailInput.classList.remove(
          "input-error"
        );

      }
    );

  }


  /* ==========================================================
     ARTICLE CARD INTERACTION
     ========================================================== */

  function initialiseArticleCards() {

    articleCards.forEach(
      (card, index) => {

        /*
          Preserve any inline Firebase navigation
          already attached to the card.
        */

        card.setAttribute(
          "data-card-index",
          String(index)
        );


        /*
          Lightweight pointer depth effect.
          Disabled on touch devices and reduced motion.
        */

        if (
          prefersReducedMotion ||
          window.matchMedia(
            "(hover: none)"
          ).matches
        ) {
          return;
        }


        card.addEventListener(
          "pointermove",
          (event) => {

            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left;

            const y =
              event.clientY -
              rect.top;

            const rotateX =
              ((y / rect.height) - 0.5) *
              -2;

            const rotateY =
              ((x / rect.width) - 0.5) *
              2;

            card.style.transform =
              `translateY(-7px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          }
        );


        card.addEventListener(
          "pointerleave",
          () => {

            card.style.transform =
              "";
          }
        );

      }
    );

  }


  initialiseArticleCards();


  /* ==========================================================
     INTERSECTION OBSERVER
     ========================================================== */

  /*
    Editorial sections reveal softly as they enter the
    viewport. This does not interfere with Firebase.
  */

  if (
    "IntersectionObserver" in window &&
    !prefersReducedMotion
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (!entry.isIntersecting) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold:
            0.08,

          rootMargin:
            "0px 0px -60px 0px"
        }
      );


    sections.forEach(
      (section) => {

        section.classList.add(
          "reveal-section"
        );

        revealObserver.observe(
          section
        );

      }
    );

  } else {

    sections.forEach(
      (section) => {
        section.classList.add(
          "is-visible"
        );
      }
    );

  }


  /* ==========================================================
     HERO LOAD ANIMATION
     ========================================================== */

  if (hero && !prefersReducedMotion) {

    const heroElements = [
      $(".hero-news-header", hero),
      $(".hero-news", hero),
      $(".hero-chip", hero),
      $("h1", hero),
      $(".hero-sub", hero),
      $(".hero-actions", hero)
    ].filter(Boolean);


    heroElements.forEach(
      (element, index) => {

        element.animate(
          [
            {
              opacity: 0,
              transform:
                "translateY(22px)"
            },
            {
              opacity: 1,
              transform:
                "translateY(0)"
            }
          ],
          {
            duration:
              750,

            delay:
              80 + index * 90,

            easing:
              "cubic-bezier(.22,1,.36,1)",

            fill:
              "both"
          }
        );

      }
    );

  }


  /* ==========================================================
     ARTICLE IMAGE LAZY LOAD ENHANCEMENT
     ========================================================== */

  const articleImages =
    $$(
      ".class-card img, .news-card img"
    );


  articleImages.forEach(
    (image) => {

      image.addEventListener(
        "load",
        () => {

          image.classList.add(
            "image-loaded"
          );

        },
        {
          once: true
        }
      );


      image.addEventListener(
        "error",
        () => {

          /*
            Prevent broken image icons from
            visually damaging the editorial grid.
          */

          image.classList.add(
            "image-error"
          );

        },
        {
          once: true
        }
      );

    }
  );


  /* ==========================================================
     SMART HOVER TINT
     ========================================================== */

  articleCards.forEach(
    (card) => {

      card.addEventListener(
        "mouseenter",
        () => {

          card.classList.add(
            "is-hovered"
          );

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.classList.remove(
            "is-hovered"
          );

        }
      );

    }
  );


  /* ==========================================================
     PAGE VISIBILITY OPTIMISATION
     ========================================================== */

  document.addEventListener(
    "visibilitychange",
    () => {

      if (
        document.hidden
      ) {
        document.documentElement.classList.add(
          "page-hidden"
        );
      } else {
        document.documentElement.classList.remove(
          "page-hidden"
        );

        /*
          Recalculate visual positioning when the
          user returns to the page.
        */

        requestScrollUpdate();
      }

    }
  );


  /* ==========================================================
     RESIZE HANDLING
     ========================================================== */

  let resizeTimer = null;

  window.addEventListener(
    "resize",
    () => {

      window.clearTimeout(
        resizeTimer
      );

      resizeTimer =
        window.setTimeout(
          () => {

            requestScrollUpdate();

          },
          120
        );

    },
    {
      passive: true
    }
  );


  /* ==========================================================
     SMOOTH INTERNAL ANCHOR NAVIGATION
     ========================================================== */

  $$(
    'a[href^="#"]'
  ).forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          const nav =
            $("nav");

          const navHeight =
            nav
              ? nav.offsetHeight
              : 0;

          const targetTop =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            navHeight -
            12;

          window.scrollTo(
            {
              top:
                Math.max(
                  0,
                  targetTop
                ),

              behavior:
                prefersReducedMotion
                  ? "auto"
                  : "smooth"
            }
          );

        }
      );

    }
  );


  /* ==========================================================
     EXPOSE SAFE REFRESH HOOK
     ========================================================== */

  /*
    Firebase can replace the article cards after
    script.js has already executed.

    Calling window.DeImage.refreshInteractions()
    after dynamic rendering reinitialises the
    interaction layer without reloading the page.
  */

  window.DeImage = window.DeImage || {};

  window.DeImage.refreshInteractions =
    function () {

      const freshCards =
        $$(".class-card");

      freshCards.forEach(
        (card, index) => {

          if (
            card.dataset.interactionsReady ===
            "true"
          ) {
            return;
          }

          card.dataset.interactionsReady =
            "true";

          card.setAttribute(
            "data-card-index",
            String(index)
          );

          if (
            prefersReducedMotion ||
            window.matchMedia(
              "(hover: none)"
            ).matches
          ) {
            return;
          }

          card.addEventListener(
            "pointermove",
            (event) => {

              const rect =
                card.getBoundingClientRect();

              const x =
                event.clientX -
                rect.left;

              const y =
                event.clientY -
                rect.top;

              const rotateX =
                ((y / rect.height) - 0.5) *
                -2;

              const rotateY =
                ((x / rect.width) - 0.5) *
                2;

              card.style.transform =
                `translateY(-7px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
          );

          card.addEventListener(
            "pointerleave",
            () => {
              card.style.transform = "";
            }
          );

        }
      );

    };


  /* ==========================================================
     FIREBASE / DYNAMIC CONTENT HOOK
     ========================================================== */

  /*
    The Firebase module in index.html injects article
    cards asynchronously.

    A MutationObserver detects those cards and applies
    the interaction layer automatically.
  */

  const postsContainer =
    $("#postsContainer");


  if (postsContainer) {

    const postsObserver =
      new MutationObserver(
        () => {

          window.DeImage
            .refreshInteractions();

        }
      );


    postsObserver.observe(
      postsContainer,
      {
        childList:
          true,

        subtree:
          true
      }
    );

  }


  /* ==========================================================
     INITIALISE
     ========================================================== */

  window.DeImage
    .refreshInteractions();


})();