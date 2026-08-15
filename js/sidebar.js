// ================= SIDEBAR INJECT =================
document.addEventListener("DOMContentLoaded", () => {

    // ================= BASE PATH FIX =================
    const pathParts = window.location.pathname.split("/");
    const isInSubFolder = pathParts.length > 2;
    const base = isInSubFolder ? "../" : "./";

    const sidebarHTML = `
    <div id="overlay" onclick="closeSidebar()"></div>

    <aside class="admin-sidebar" id="sidebar">

        <div style="position:absolute;top:15px;right:15px;cursor:pointer;color:#fff;" onclick="closeSidebar()">
            <i class="fa-solid fa-xmark"></i>
        </div>

        <div class="brand-box">
    <img src="${base}assets/brand.png" alt="Brand Logo">
</div>

        <div class="nav-scroll">

            <a href="${base}dashboard/index.html" class="nav-item" data-route="dashboard">
                <i class="fa-solid fa-gauge w-5 text-center"></i> Dashboard
            </a>

            <p class="nav-group-label">Content</p>

            <a href="${base}blog-list/index.html" class="nav-item" data-route="blog-list">
                <i class="fa-solid fa-newspaper w-5 text-center"></i> All Posts
            </a>

            <a href="${base}editor/index.html" class="nav-item" data-route="editor">
                <i class="fa-solid fa-pen w-5 text-center"></i> Add New
            </a>

            <p class="nav-group-label">Homepage</p>

            <a href="${base}index.html" class="nav-item" data-route="home">
                <i class="fa-solid fa-globe w-5 text-center"></i> View Site
            </a>

            <p class="nav-group-label">Users</p>

            <a href="#" class="nav-item">
                <i class="fa-solid fa-users w-5 text-center"></i> Authors
            </a>

            <p class="nav-group-label">Settings</p>

            <a href="#" class="nav-item">
                <i class="fa-solid fa-gear w-5 text-center"></i> General
            </a>

            <a href="#" class="nav-item text-red-400 hover:bg-red-900/20 mt-2">
                <i class="fa-solid fa-right-from-bracket w-5 text-center"></i> Logout
            </a>

        </div>
    </aside>
    `;

    document.body.insertAdjacentHTML("afterbegin", sidebarHTML);

    // ================= TOGGLE =================
    window.toggleSidebar = function () {
        document.getElementById('sidebar').classList.add('open');
        document.getElementById('overlay').classList.add('show');
    }

    window.closeSidebar = function () {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('overlay').classList.remove('show');
    }

    // ================= CLICK ACTIVE (INSTANT UI FEEDBACK) =================
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function () {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            closeSidebar();
        });
    });

    // ================= ACTIVE ROUTE (CLEAN + ACCURATE) =================
    (function () {
        const fullPath = window.location.pathname;

        const links = document.querySelectorAll('.nav-item');

        // Remove all active first
        links.forEach(link => link.classList.remove('active'));

        links.forEach(link => {
            const route = link.dataset.route;
            if (!route) return;

            // Match based on folder structure (NOT filename)
            if (fullPath.includes("/" + route + "/")) {
                link.classList.add('active');
            }
        });

        // Fallback: if nothing matched, highlight dashboard
        if (!document.querySelector('.nav-item.active')) {
            const dashboard = document.querySelector('[data-route="dashboard"]');
            if (dashboard) dashboard.classList.add('active');
        }
    })();

});