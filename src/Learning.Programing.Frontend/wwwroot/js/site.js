// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
// Sidebar toggle functionality
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function toggleSidebar() {
  sidebar.classList.toggle("-translate-x-full");
  sidebarOverlay.classList.toggle("hidden");
}

sidebarToggle.addEventListener("click", toggleSidebar);
sidebarOverlay.addEventListener("click", toggleSidebar);

// Close sidebar on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !sidebar.classList.contains("-translate-x-full")) {
    toggleSidebar();
  }
});

// Auto-manage sidebar on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024) {
    // Desktop: show sidebar, hide overlay
    sidebar.classList.remove("-translate-x-full");
    sidebarOverlay.classList.add("hidden");
  } else {
    // Mobile: hide sidebar, hide overlay
    sidebar.classList.add("-translate-x-full");
    sidebarOverlay.classList.add("hidden");
  }
});

// User dropdown menu functionality
const userMenuButton = document.getElementById("userMenuButton");
const userDropdown = document.getElementById("userDropdown");
let isUserDropdownOpen = false;

// Toggle user dropdown on click
userMenuButton.addEventListener("click", (e) => {
  e.stopPropagation();
  isUserDropdownOpen = !isUserDropdownOpen;

  if (isUserDropdownOpen) {
    userDropdown.classList.remove("opacity-0", "invisible");
    userDropdown.classList.add("opacity-100", "visible");
  } else {
    userDropdown.classList.add("opacity-0", "invisible");
    userDropdown.classList.remove("opacity-100", "visible");
  }
});

// Close user dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
    isUserDropdownOpen = false;
    userDropdown.classList.add("opacity-0", "invisible");
    userDropdown.classList.remove("opacity-100", "visible");
  }
});

// Close user dropdown on escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isUserDropdownOpen) {
    isUserDropdownOpen = false;
    userDropdown.classList.add("opacity-0", "invisible");
    userDropdown.classList.remove("opacity-100", "visible");
  }
});
