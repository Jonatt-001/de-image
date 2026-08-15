<!-- =========================================================
     DE IMAGE MAGAZINE
     GLOBAL NAVIGATION
========================================================== -->

<nav>

  <a href="/" class="nav-logo" aria-label="De Image Magazine home">
    DE IMAGE<span>★</span>MAG
  </a>


  <!-- ================= DESKTOP NAV ================= -->

  <div class="nav-links">

    <a href="/">
      Home
    </a>

    <a href="/newsfeed/">
      Newsroom
    </a>

    <a href="/categories/">
      Categories
    </a>

    <a href="/about/">
      About
    </a>

    <a href="/contact/">
      Contact
    </a>

  </div>


  <!-- ================= MENU TOGGLE ================= -->

  <button
    class="menu-toggle"
    id="menuToggle"
    type="button"
    aria-label="Open menu"
    aria-controls="mobileMenu"
    aria-expanded="false"
  >

    <svg
      viewBox="0 0 100 100"
      width="28"
      height="28"
      aria-hidden="true"
    >

      <path
        class="line top"
        d="M 20,30 H 80"
      ></path>

      <path
        class="line middle"
        d="M 20,50 H 80"
      ></path>

      <path
        class="line bottom"
        d="M 20,70 H 80"
      ></path>

    </svg>

  </button>

</nav>


<!-- =========================================================
     OVERLAY
========================================================== -->

<div
  class="menu-overlay"
  id="menuOverlay"
  aria-hidden="true"
></div>


<!-- =========================================================
     MOBILE / FULLSCREEN DRAWER
========================================================== -->

<div
  class="mobile-menu"
  id="mobileMenu"
  aria-hidden="true"
  role="dialog"
  aria-modal="true"
  aria-label="De Image Magazine navigation"
>


  <!-- ================= DRAWER HEADER ================= -->

  <div class="menu-header">

    <a
      href="/"
      class="menu-brand"
      aria-label="De Image Magazine home"
    >
      DE IMAGE<span>★</span>MAG
    </a>


    <!-- ================= CLOSE X ================= -->

    <button
      class="menu-close"
      id="menuClose"
      type="button"
      aria-label="Close menu"
      aria-controls="mobileMenu"
      aria-expanded="true"
    >

      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="none"
        aria-hidden="true"
      >

        <path
          d="M5 5L19 19"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
        ></path>

        <path
          d="M19 5L5 19"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
        ></path>

      </svg>

    </button>

  </div>


  <!-- ================= MENU CONTENT ================= -->

  <div class="menu-content">


    <!-- =====================================================
         EXPLORE
    ====================================================== -->

    <div class="menu-group">

      <div class="menu-title">
        Explore
      </div>

      <a href="/">
        Home
      </a>

      <a href="/newsfeed/">
        Newsroom
      </a>

      <a href="/newsfeed/#latest">
        Latest Stories
      </a>

      <a href="/categories/">
        All Categories
      </a>

    </div>


    <div class="menu-divider"></div>


    <!-- =====================================================
         CATEGORIES
    ====================================================== -->

    <div class="menu-group">

      <div class="menu-title">
        Categories
      </div>

      <a href="/categories/?cat=General">
        General
      </a>

      <a href="/categories/?cat=News">
        News
      </a>

      <a href="/categories/?cat=Politics">
        Politics
      </a>

      <a href="/categories/?cat=Business">
        Business
      </a>

      <a href="/categories/?cat=Technology">
        Technology
      </a>

      <a href="/categories/?cat=Culture">
        Culture
      </a>

      <a href="/categories/?cat=Entertainment">
        Entertainment
      </a>

      <a href="/categories/?cat=World">
        World
      </a>

    </div>


    <div class="menu-divider"></div>


    <!-- =====================================================
         PUBLICATION
    ====================================================== -->

    <div class="menu-group">

      <div class="menu-title">
        Publication
      </div>

      <a href="/about/">
        About De Image
      </a>

      <a href="/editorial-board/">
        Editorial Board
      </a>

      <a href="/ceo/">
        Leadership / CEO
      </a>

      <a href="/editorial-policy/">
        Editorial Policy
      </a>

    </div>


    <div class="menu-divider"></div>


    <!-- =====================================================
         BUSINESS
    ====================================================== -->

    <div class="menu-group">

      <div class="menu-title">
        Work With Us
      </div>

      <a href="/advertise/">
        Advertise
      </a>

      <a href="/media-kit/">
        Media Kit
      </a>

      <a href="/contact/">
        Contact
      </a>

    </div>


    <div class="menu-divider"></div>


    <!-- =====================================================
         LEGAL
    ====================================================== -->

    <div class="menu-group">

      <div class="menu-title">
        Legal
      </div>

      <a href="/privacy/">
        Privacy Policy
      </a>

      <a href="/terms/">
        Terms of Use
      </a>

      <a href="/cookies/">
        Cookie Policy
      </a>

    </div>


  </div>


  <!-- =====================================================
       DRAWER FOOTER
  ====================================================== -->

  <div class="menu-footer">

    <div class="menu-footer-brand">
      DE IMAGE<span>★</span>MAG
    </div>

    <div class="menu-footer-copy">
      Independent digital journalism.
      <br>
      Nigeria · Africa · World
    </div>

    <div class="menu-footer-year">
      © 2026 De Image Magazine
    </div>

  </div>


</div>


<!-- =========================================================
     INLINE DRAWER CONTROLLER

     No menu.js required.
========================================================== -->

<script>

(function () {

  "use strict";


  /* =========================================================
     ELEMENTS
  ========================================================== */

  const menuToggle =
    document.getElementById("menuToggle");

  const menuClose =
    document.getElementById("menuClose");

  const mobileMenu =
    document.getElementById("mobileMenu");

  const menuOverlay =
    document.getElementById("menuOverlay");


  /* =========================================================
     SAFETY CHECK
  ========================================================== */

  if (
    !menuToggle ||
    !menuClose ||
    !mobileMenu ||
    !menuOverlay
  ) {
    return;
  }


  /* =========================================================
     OPEN MENU
  ========================================================== */

  function openMenu() {

    mobileMenu.classList.add("open");

    menuOverlay.classList.add("active");

    menuToggle.classList.add("active");

    mobileMenu.setAttribute(
      "aria-hidden",
      "false"
    );

    menuOverlay.setAttribute(
      "aria-hidden",
      "false"
    );

    menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Close menu"
    );

    document.body.classList.add(
      "menu-open"
    );

    document.documentElement.classList.add(
      "menu-open"
    );

  }


  /* =========================================================
     CLOSE MENU
  ========================================================== */

  function closeMenu() {

    mobileMenu.classList.remove("open");

    menuOverlay.classList.remove("active");

    menuToggle.classList.remove("active");

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    menuOverlay.setAttribute(
      "aria-hidden",
      "true"
    );

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Open menu"
    );

    document.body.classList.remove(
      "menu-open"
    );

    document.documentElement.classList.remove(
      "menu-open"
    );

  }


  /* =========================================================
     HAMBURGER
  ========================================================== */

  menuToggle.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      const isOpen =
        mobileMenu.classList.contains("open");

      if (isOpen) {

        closeMenu();

      } else {

        openMenu();

      }

    }
  );


  /* =========================================================
     X CLOSE BUTTON
  ========================================================== */

  menuClose.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      event.stopPropagation();

      closeMenu();

    }
  );


  /* =========================================================
     OVERLAY CLOSE
  ========================================================== */

  menuOverlay.addEventListener(
    "click",
    function () {

      closeMenu();

    }
  );


  /* =========================================================
     CLOSE WHEN CLICKING A MENU LINK
  ========================================================== */

  const menuLinks =
    mobileMenu.querySelectorAll(
      "a"
    );

  menuLinks.forEach(
    function (link) {

      link.addEventListener(
        "click",
        function () {

          closeMenu();

        }
      );

    }
  );


  /* =========================================================
     ESC KEY
  ========================================================== */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        mobileMenu.classList.contains("open")
      ) {

        closeMenu();

        menuToggle.focus();

      }

    }
  );


  /* =========================================================
     PREVENT BACKGROUND SCROLL
  ========================================================== */

  document.addEventListener(
    "touchmove",
    function (event) {

      if (
        mobileMenu.classList.contains("open") &&
        !mobileMenu.contains(event.target)
      ) {

        event.preventDefault();

      }

    },
    {
      passive: false
    }
  );


  /* =========================================================
     RESPONSIVE SAFETY

     If the viewport becomes desktop width while the
     drawer is open, reset the mobile menu state.
  ========================================================== */

  window.addEventListener(
    "resize",
    function () {

      if (
        window.innerWidth > 900 &&
        mobileMenu.classList.contains("open")
      ) {

        closeMenu();

      }

    }
  );


})();

</script>