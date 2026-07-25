import { site } from "./data.mjs";

const navigation = [
  ["About", "/#about"],
  ["Experience", "/#experience"],
  ["Publications", "/publication/"],
  ["Thesis", "/project/thesis/"],
  ["Contact", "/#contact"],
];

export function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${site.baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function slugLabel(slug) {
  const overrides = {
    ai: "AI",
    cdr: "Call detail records",
    knn: "k-nearest neighbours",
  };
  return (
    overrides[slug] ||
    slug
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export function statusBadges(publication) {
  const statusClass =
    publication.status === "Published" ? "badge--published" : "badge--review";
  return `<div class="badges" aria-label="Publication status">
    <span class="badge ${statusClass}">${escapeHtml(publication.status)}</span>
    <span class="badge badge--type">${escapeHtml(publication.type)}</span>
    ${publication.openAccess ? '<span class="badge badge--open">Open access</span>' : ""}
  </div>`;
}

function authorsInline(authors) {
  return authors
    .map((author) =>
      author === "Manuel Mendoza-Hurtado"
        ? `<strong>${escapeHtml(author)}</strong>`
        : escapeHtml(author),
    )
    .join(", ");
}

export function linkButtons(links, extraClass = "") {
  if (!links?.length) return "";
  return `<div class="button-row ${extraClass}">
    ${links
      .map(({ label, url }) => {
        const external = /^https?:\/\//.test(url);
        return `<a class="button button--small" href="${escapeHtml(url)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${escapeHtml(label)}${external ? '<span aria-hidden="true"> ↗</span>' : ""}</a>`;
      })
      .join("\n")}
  </div>`;
}

export function publicationCard(publication, { compact = false } = {}) {
  return `<article class="publication-card${publication.featured ? " publication-card--featured" : ""}${compact ? " publication-card--compact" : ""}">
    <div class="publication-card__meta">
      <span>${escapeHtml(String(publication.year))}</span>
      <span aria-hidden="true">·</span>
      <span>${escapeHtml(publication.venue)}</span>
    </div>
    ${statusBadges(publication)}
    <h3><a href="/publication/${escapeHtml(publication.slug)}/">${escapeHtml(publication.title)}</a></h3>
    <p class="authors">${authorsInline(publication.authors)}</p>
    <p>${escapeHtml(publication.summary)}</p>
    <div class="publication-card__footer">
      <a class="text-link" href="/publication/${escapeHtml(publication.slug)}/">Read publication details <span aria-hidden="true">→</span></a>
      ${publication.doi ? `<a class="doi-link" href="https://doi.org/${escapeHtml(publication.doi)}" target="_blank" rel="noopener noreferrer">doi:${escapeHtml(publication.doi)}</a>` : ""}
    </div>
  </article>`;
}

function header(activePath) {
  return `<header class="site-header">
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="shell header-inner">
      <a class="wordmark" href="/" aria-label="${escapeHtml(site.name)}, home">
        <span class="wordmark__monogram" aria-hidden="true">MM</span>
        <span class="wordmark__name">${escapeHtml(site.shortName)}</span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
        <span class="menu-toggle__bars" aria-hidden="true"></span>
        <span class="sr-only">Toggle navigation</span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Primary navigation">
        ${navigation
          .map(([label, url]) => {
            const isActive =
              activePath === url ||
              (url === "/publication/" && activePath.startsWith("/publication/")) ||
              (url === "/project/thesis/" && activePath.startsWith("/project/"));
            return `<a href="${url}"${isActive ? ' aria-current="page"' : ""}>${label}</a>`;
          })
          .join("\n")}
      </nav>
      <button class="theme-toggle" type="button" aria-label="Use dark colour scheme" title="Toggle colour scheme">
        <span class="theme-toggle__light" aria-hidden="true">☼</span>
        <span class="theme-toggle__dark" aria-hidden="true">◐</span>
      </button>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="shell footer-grid">
      <div>
        <p class="footer-name">${escapeHtml(site.name)}</p>
        <p>${escapeHtml(site.role)} at the <a href="${escapeHtml(site.affiliation.url)}">${escapeHtml(site.affiliation.name)}</a>.</p>
      </div>
      <div class="footer-links">
        <a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a>
        <a href="${escapeHtml(site.cv)}">Public CV (PDF)</a>
        <a href="/publication/">Publications</a>
      </div>
      <p class="footer-meta">© ${site.copyrightYear} ${escapeHtml(site.name)}<br>Built as a small, accessible static site.</p>
    </div>
  </footer>`;
}

export function page({
  title,
  description,
  path,
  content,
  jsonLd = [],
  pageClass = "",
  ogImage = false,
  type = "website",
}) {
  const canonical = absoluteUrl(path);
  const fullTitle = title === site.name ? title : `${title} · ${site.name}`;
  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  const socialImage = `${site.baseUrl}/assets/og.png`;
  return `<!doctype html>
<html lang="en" data-theme="auto">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="author" content="${escapeHtml(site.name)}">
  <meta name="theme-color" content="#10283f">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/media/icon_hu3518839863cab9d8db50f172980c2d5d_1651_32x32_fill_lanczos_center_2.png">
  <link rel="manifest" href="/manifest.webmanifest">
  <link rel="stylesheet" href="/assets/site.css?v=${escapeHtml(site.assetVersion)}">
  <meta property="og:type" content="${escapeHtml(type)}">
  <meta property="og:site_name" content="${escapeHtml(site.name)}">
  <meta property="og:title" content="${escapeHtml(fullTitle)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  ${ogImage ? `<meta property="og:image" content="${socialImage}">\n  <meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">\n  <meta property="og:image:alt" content="${escapeHtml(site.name)} — academic profile">` : ""}
  <meta name="twitter:card" content="${ogImage ? "summary_large_image" : "summary"}">
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  ${schemas
    .filter(Boolean)
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`,
    )
    .join("\n  ")}
</head>
<body class="${escapeHtml(pageClass)}">
  ${header(path)}
  <main id="main">
    ${content}
  </main>
  ${footer()}
  <script src="/assets/site.js?v=${escapeHtml(site.assetVersion)}" defer></script>
</body>
</html>
`.replace(/[ \t]+$/gm, "");
}

export function tagPills(tags) {
  return `<div class="tag-list" aria-label="Topics">
    ${tags
      .map(
        (tag) =>
          `<a class="tag" href="/tag/${escapeHtml(tag)}/">${escapeHtml(slugLabel(tag))}</a>`,
      )
      .join("\n")}
  </div>`;
}

export function authorList(authors) {
  return authorsInline(authors);
}

export function redirectPage(path, destination, ogImage = false) {
  return page({
    title: "Page moved",
    description: "This page has moved to a new permanent address.",
    path,
    ogImage,
    content: `<section class="simple-page">
      <div class="shell shell--narrow">
        <p class="eyebrow">Page moved</p>
        <h1>This page has a new address.</h1>
        <p>You will be redirected to <a href="${escapeHtml(destination)}">${escapeHtml(destination)}</a>.</p>
      </div>
    </section>
    <script>window.location.replace(${JSON.stringify(destination)});</script>`,
  }).replace(
    "</head>",
    `  <meta http-equiv="refresh" content="0; url=${escapeHtml(destination)}">\n</head>`,
  );
}
