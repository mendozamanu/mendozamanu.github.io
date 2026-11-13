(() => {
  async function showCrossrefCitations() {
    const badges = document.querySelectorAll("[data-crossref-doi]");
    if (!badges.length) return;

    const dois = [...new Set(
      [...badges].map(({ dataset }) => dataset.crossrefDoi.toLowerCase()),
    )].sort();
    const url = new URL("https://api.crossref.org/works");
    url.search = new URLSearchParams({
      filter: dois.map((doi) => `doi:${doi}`).join(","),
      select: "DOI,is-referenced-by-count",
      rows: dois.length,
    });

    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!response.ok) return;

      const { message } = await response.json();
      const counts = new Map(
        message.items.map((work) => [work.DOI.toLowerCase(), work["is-referenced-by-count"]]),
      );
      for (const badge of badges) {
        const count = counts.get(badge.dataset.crossrefDoi.toLowerCase());
        if (!Number.isSafeInteger(count) || count < 0) continue;
        badge.textContent = `${count.toLocaleString("en")} Crossref ${count === 1 ? "citation" : "citations"}`;
        badge.hidden = false;
      }
    } catch {
      // Keep badges hidden when Crossref is unavailable.
    }
  }

  showCrossrefCitations();

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
