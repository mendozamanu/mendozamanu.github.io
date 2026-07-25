(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector(".theme-toggle");
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const storedTheme = localStorage.getItem("colour-scheme");
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === "dark";
    themeButton?.setAttribute(
      "aria-label",
      isDark ? "Use light colour scheme" : "Use dark colour scheme",
    );
  }

  applyTheme(storedTheme || (preferredDark ? "dark" : "light"));

  themeButton?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("colour-scheme", next);
    applyTheme(next);
  });

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    nav?.setAttribute("data-open", String(open));
  });

  nav?.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    menuButton?.setAttribute("aria-expanded", "false");
    nav.removeAttribute("data-open");
  });
})();
