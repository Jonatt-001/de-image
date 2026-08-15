// ================= GLOBAL SKELETON SYSTEM =================

window.Skeleton = {

  // 🔥 Inject skeleton into any container
  show(containerId, type = "card", count = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = "";

    // ================= CARD (POST GRID) =================
    if (type === "card") {
      for (let i = 0; i < count; i++) {
        html += `
          <div class="skeleton-card">
            <div class="skeleton skeleton-img"></div>
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text" style="width:80%"></div>
          </div>
        `;
      }
    }

    // ================= TEXT =================
    else if (type === "text") {
      html = `
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text"></div>
      `;
    }

    // ================= HERO (HORIZONTAL SCROLL) =================
    else if (type === "hero") {
      html = `
        <div class="skeleton-hero-wrapper">
          ${Array.from({ length: count }).map(() => `
            <div class="skeleton skeleton-hero-card"></div>
          `).join("")}
        </div>
      `;
    }

    container.innerHTML = html;
  },

  // 🔥 Remove skeleton cleanly
  hide(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
  }

};