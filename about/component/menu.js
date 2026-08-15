fetch("component/menu.html")
  .then(res => {
    if (!res.ok) throw new Error("Menu failed to load");
    return res.text();
  })
  .then(data => {
    document.getElementById("menu-container").innerHTML = data;

    // ================= ELEMENTS =================
    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("menuOverlay");
    const links = document.querySelectorAll(".menu-content a");
    const groups = document.querySelectorAll(".menu-group");

    // ================= MENU CONTROL =================
    function openMenu() {
      toggle.classList.add("active");
      menu.classList.add("open");
      overlay.classList.add("active");
      document.body.classList.add("menu-open");
    }

    function closeMenu() {
      toggle.classList.remove("active");
      menu.classList.remove("open");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    }

    toggle.addEventListener("click", () => {
      menu.classList.contains("open") ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    // ================= ACTIVE LOGIC (SMART) =================

    const currentURL = new URL(window.location.href);
    const currentPath = currentURL.pathname.replace(/\/$/, "");
    const currentCat = currentURL.searchParams.get("cat");

    let activeLink = null;

    links.forEach(link => {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(href, window.location.origin);
      const linkPath = url.pathname.replace(/\/$/, "");
      const linkCat = url.searchParams.get("cat");

      let isMatch = false;

      // ✅ EXACT PAGE MATCH
      if (currentPath === linkPath) {
        isMatch = true;

        // ✅ IF CATEGORY EXISTS → MUST MATCH
        if (linkCat) {
          isMatch = linkCat === currentCat;
        }
      }

      if (isMatch) {
        activeLink = link;
      }
    });

    // ================= APPLY ACTIVE STATE =================

    if (activeLink) {
      activeLink.classList.add("active");

      const group = activeLink.closest(".menu-group");

      if (group) {
        // remove previous active titles
        groups.forEach(g => {
          const title = g.querySelector(".menu-title");
          if (title) title.classList.remove("active");
        });

        const title = group.querySelector(".menu-title");
        if (title) title.classList.add("active");
      }
    }

    // ================= CLICK FEEDBACK =================

    links.forEach(link => {
      link.addEventListener("click", () => {
        links.forEach(l => l.classList.remove("active"));

        link.classList.add("active");

        // update group highlight instantly
        groups.forEach(g => {
          const title = g.querySelector(".menu-title");
          if (title) title.classList.remove("active");
        });

        const group = link.closest(".menu-group");
        if (group) {
          const title = group.querySelector(".menu-title");
          if (title) title.classList.add("active");
        }

        closeMenu();
      });
    });

  })
  .catch(err => console.error("Menu load error:", err));