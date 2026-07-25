import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  publicationBySlug,
  publications,
  site,
  thesis,
} from "../site-src/data.mjs";
import {
  absoluteUrl,
  authorList,
  escapeHtml,
  formatDate,
  linkButtons,
  page,
  publicationCard,
  redirectPage,
  slugLabel,
  statusBadges,
  tagPills,
} from "../site-src/templates.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectories = [
  "admin",
  "assets",
  "categories",
  "css",
  "en",
  "js",
  "project",
  "publication",
  "publication-type",
  "publication_types",
  "tag",
  "tags",
  "uploads",
];
const legacyRootFiles = [
  "404.html",
  "_headers",
  "_redirects",
  "index.html",
  "index.json",
  "index.xml",
  "manifest.webmanifest",
  "robots.txt",
  "sitemap.xml",
];

for (const directory of outputDirectories) {
  rmSync(join(root, directory), { recursive: true, force: true });
}
for (const file of legacyRootFiles) {
  rmSync(join(root, file), { force: true });
}
rmSync(join(root, "files", "resume.pdf"), { force: true });

function write(path, content) {
  const destination = join(root, path);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, content.replace(/\r\n/g, "\n"), "utf8");
}

function copy(source, destination) {
  const target = join(root, destination);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(join(root, source), target);
}

copy("site-src/styles.css", "assets/site.css");
copy("site-src/site.js", "assets/site.js");
copy("site-src/profile.png", "assets/profile.png");
if (existsSync(join(root, "site-src", "og.png"))) {
  copy("site-src/og.png", "assets/og.png");
}
const hasOgImage = existsSync(join(root, "assets", "og.png"));

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.baseUrl}/#person`,
  name: site.name,
  url: site.baseUrl,
  image: absoluteUrl(site.profileImage),
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  description: site.description,
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: site.affiliation.name,
    url: site.affiliation.url,
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Córdoba",
      url: "https://www.uco.es/",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "University of Málaga",
      url: "https://www.uma.es/",
    },
  ],
  knowsAbout: site.interests,
  sameAs: site.social.map(({ url }) => url),
};

const homeContent = `
<section class="hero" aria-labelledby="hero-title">
  <div class="shell hero-grid">
    <div>
      <p class="eyebrow">Academic profile · University of Jaén</p>
      <h1 id="hero-title">${escapeHtml(site.name)}</h1>
      <p class="hero-role">${escapeHtml(site.headline)}</p>
      <p class="hero-focus">${escapeHtml(site.focus)}</p>
      <div class="button-row">
        <a class="button" href="/publication/">Explore publications</a>
        <a class="button button--secondary" href="${escapeHtml(site.cv)}">Download public CV</a>
        <a class="button button--secondary" href="mailto:${escapeHtml(site.email)}">Email me</a>
      </div>
    </div>
    <div class="hero-portrait">
      <div class="hero-photo-frame">
        <img src="${escapeHtml(site.profileImage)}?v=${escapeHtml(site.assetVersion)}" alt="Portrait of ${escapeHtml(site.name)}" width="1368" height="1368" fetchpriority="high">
      </div>
    </div>
  </div>
</section>

<section class="section section--surface" id="about" aria-labelledby="about-title">
  <div class="shell">
    <div class="section-header">
      <div>
        <p class="eyebrow">About</p>
        <h2 id="about-title">Machine learning grounded in place.</h2>
      </div>
      <p>My work develops interpretable, transferable methods for learning from mobile-network and geolocated digital traces.</p>
    </div>
    <div class="about-grid">
      <div class="prose">
        ${site.bio.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}
      </div>
      <aside class="aside-card">
        <h3>Research interests</h3>
        <ul class="plain-list">
          ${site.interests.map((interest) => `<li>${escapeHtml(interest)}</li>`).join("\n")}
        </ul>
      </aside>
    </div>
  </div>
</section>

<section class="section" id="experience" aria-labelledby="experience-title">
  <div class="shell">
    <div class="section-header">
      <div>
        <p class="eyebrow">Experience</p>
        <h2 id="experience-title">Research and university teaching.</h2>
      </div>
      <p>Academic and technical experience spanning machine learning research, software engineering and teaching in computer science.</p>
    </div>
    <div class="timeline">
      ${site.experience
        .map(
          (item) => `<article class="timeline-item">
            <p class="timeline-period">${escapeHtml(item.period)}</p>
            <div>
              <h3>${escapeHtml(item.role)}</h3>
              <a class="timeline-institution" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.institution)}</a>
              <p class="timeline-detail">${escapeHtml(item.location)} · ${escapeHtml(item.detail)}</p>
            </div>
            <a class="timeline-logo" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(item.institution)}">
              <img src="${escapeHtml(item.logo)}" alt="" loading="lazy">
            </a>
          </article>`,
        )
        .join("\n")}
    </div>
  </div>
</section>

<section class="section section--surface" id="education" aria-labelledby="education-title">
  <div class="shell">
    <div class="section-header">
      <div>
        <p class="eyebrow">Education</p>
        <h2 id="education-title">Academic background.</h2>
      </div>
      <p>A computing background developed through software engineering, telematics and advanced doctoral research.</p>
    </div>
    <div class="education-grid">
      ${site.education
        .map(
          (item) => `<article class="education-card">
            <p class="education-period">${escapeHtml(item.period)}</p>
            <h3>${item.url ? `<a href="${escapeHtml(item.url)}">${escapeHtml(item.degree)}</a>` : escapeHtml(item.degree)}</h3>
            <p><strong>${escapeHtml(item.institution)}</strong>${item.detail ? `<br>${escapeHtml(item.detail)}` : ""}</p>
            ${item.thesis ? `<p>${escapeHtml(item.thesis)}</p>` : ""}
          </article>`,
        )
        .join("\n")}
    </div>
  </div>
</section>

<section class="section" id="featured-research" aria-labelledby="featured-title">
  <div class="shell featured-grid">
    <div>
      <p class="featured-kicker">Featured publication</p>
      <h2 id="featured-title">MAPLID</h2>
      <p>Multi-label learning reveals concurrent urban functions that single-label clustering hides.</p>
    </div>
    ${publicationCard(publicationBySlug.get("maplid"))}
  </div>
</section>

<section class="section section--surface" aria-labelledby="recent-title">
  <div class="shell">
    <div class="section-header">
      <div>
        <p class="eyebrow">Selected research</p>
        <h2 id="recent-title">Mobility, geography and multi-label learning.</h2>
      </div>
      <p>The publication record spans population-pattern identification, cross-border mobility and locally adaptive classification.</p>
    </div>
    <div class="publication-grid">
      ${publications
        .filter((publication) => !publication.featured)
        .slice(0, 4)
        .map((publication) => publicationCard(publication, { compact: true }))
        .join("\n")}
    </div>
    <div class="button-row" style="margin-top: 2rem">
      <a class="button button--secondary" href="/publication/">View all publications</a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="thesis-title">
  <div class="shell thesis-callout">
    <p class="eyebrow">Completed doctorate</p>
    <h2 id="thesis-title">${escapeHtml(thesis.title)}</h2>
    <div class="thesis-facts">
      <span>Defended ${escapeHtml(thesis.defenceDate)}</span>
      <span>${escapeHtml(thesis.grade)}</span>
      <span>${escapeHtml(thesis.mention)}</span>
    </div>
    <p>The thesis develops supervised and multi-label methods for identifying meaningful places and mobility patterns from mobile phone and geolocated social-network data.</p>
    <div class="button-row">
      <a class="button" href="/project/thesis/">Read the thesis summary</a>
      <a class="button" href="https://helvia.uco.es/handle/10396/36619" target="_blank" rel="noopener noreferrer">Helvia record ↗</a>
    </div>
  </div>
</section>

<section class="section section--surface" id="contact" aria-labelledby="contact-title">
  <div class="shell contact-grid">
    <div>
      <p class="eyebrow">Contact</p>
      <h2 id="contact-title">Let’s talk about research and collaboration.</h2>
      <p>The most reliable way to reach me is through my University of Jaén address.</p>
      <a class="contact-email" href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a>
      <div class="button-row">
        <a class="button" href="mailto:${escapeHtml(site.email)}">Compose an email</a>
        <a class="button button--secondary" href="${escapeHtml(site.affiliation.profile)}" target="_blank" rel="noopener noreferrer">University profile</a>
      </div>
    </div>
    <div class="profile-links">
      ${site.social
        .map(
          (profile) => `<a class="profile-link" href="${escapeHtml(profile.url)}" target="_blank" rel="noopener noreferrer">
            <span>${escapeHtml(profile.label)}</span>
            <span>${escapeHtml(profile.value)} ↗</span>
          </a>`,
        )
        .join("\n")}
    </div>
  </div>
</section>`;

write(
  "index.html",
  page({
    title: site.name,
    description: site.description,
    path: "/",
    content: homeContent,
    jsonLd: personSchema,
    pageClass: "home",
    ogImage: hasOgImage,
  }),
);

const published = publications.filter(
  (publication) => publication.status === "Published",
);
const manuscripts = publications.filter(
  (publication) => publication.status !== "Published",
);
const publicationArchive = `
<section class="page-hero">
  <div class="shell">
    <p class="eyebrow">Research output</p>
    <h1>Publications</h1>
    <p class="page-hero__lead">Peer-reviewed work and current manuscripts in human mobility, geospatial machine learning and multi-label classification. Every record below is rendered directly in the page.</p>
    <p class="page-hero__meta">${published.length} published articles · ${manuscripts.length} manuscript under review</p>
  </div>
</section>
<section class="archive-section">
  <div class="shell">
    <div class="archive-heading"><h2>Published articles</h2><span>${published.length} records</span></div>
    <div class="publication-grid">
      ${published.map((publication) => publicationCard(publication)).join("\n")}
    </div>
  </div>
</section>
<section class="archive-section">
  <div class="shell">
    <div class="archive-heading"><h2>Manuscripts</h2><span>${manuscripts.length} record</span></div>
    <div class="publication-grid">
      ${manuscripts.map((publication) => publicationCard(publication)).join("\n")}
    </div>
  </div>
</section>`;

write(
  "publication/index.html",
  page({
    title: "Publications",
    description:
      "Publications by Manuel Mendoza Hurtado in human mobility, geospatial machine learning and multi-label classification.",
    path: "/publication/",
    content: publicationArchive,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Publications by Manuel Mendoza Hurtado",
      url: `${site.baseUrl}/publication/`,
      hasPart: publications.map((publication) => ({
        "@type":
          publication.status === "Published"
            ? "ScholarlyArticle"
            : "CreativeWork",
        name: publication.title,
        url: `${site.baseUrl}/publication/${publication.slug}/`,
      })),
    },
    ogImage: hasOgImage,
  }),
);

for (const publication of publications) {
  const schema = {
    "@context": "https://schema.org",
    "@type":
      publication.status === "Published" ? "ScholarlyArticle" : "CreativeWork",
    headline: publication.title,
    name: publication.title,
    url: `${site.baseUrl}/publication/${publication.slug}/`,
    datePublished: publication.date,
    author: publication.authors.map((author) => ({
      "@type": "Person",
      name: author,
    })),
    about: publication.tags.map(slugLabel),
    abstract: publication.abstract,
    isPartOf: {
      "@type": "Periodical",
      name: publication.venue,
    },
    ...(publication.doi
      ? {
          sameAs: `https://doi.org/${publication.doi}`,
          identifier: {
            "@type": "PropertyValue",
            propertyID: "DOI",
            value: publication.doi,
          },
        }
      : {}),
  };
  const detail = `
  <section class="page-hero page-hero--detail">
    <div class="shell">
      <p class="eyebrow">${escapeHtml(publication.venue)} · ${escapeHtml(String(publication.year))}</p>
      ${statusBadges(publication)}
      <h1>${escapeHtml(publication.title)}</h1>
      <p class="page-hero__lead">${authorList(publication.authors)}</p>
      ${publication.authorNote ? `<p class="author-note">${escapeHtml(publication.authorNote)}</p>` : ""}
    </div>
  </section>
  <section class="publication-detail">
    <div class="shell publication-detail__grid">
      <article class="publication-detail__main">
        <h2>Abstract</h2>
        <p class="abstract">${escapeHtml(publication.abstract)}</p>
        <h2>Citation</h2>
        <p class="citation">${escapeHtml(publication.citation)}</p>
        ${tagPills(publication.tags)}
      </article>
      <aside class="publication-side aside-card" aria-label="Publication information">
        <h3>Publication details</h3>
        <dl class="metadata-list">
          <div><dt>Published</dt><dd>${formatDate(publication.date)}</dd></div>
          <div><dt>Venue</dt><dd>${escapeHtml(publication.venue)}</dd></div>
          <div><dt>Reference</dt><dd>${escapeHtml(publication.publicationDetail)}</dd></div>
          ${publication.doi ? `<div><dt>DOI</dt><dd><a href="https://doi.org/${escapeHtml(publication.doi)}">${escapeHtml(publication.doi)}</a></dd></div>` : ""}
        </dl>
        ${linkButtons(publication.links)}
        ${publication.bibtex ? `<div class="button-row" style="margin-top: .7rem"><a class="button button--small" href="/publication/${escapeHtml(publication.slug)}/cite.bib" download>Download BibTeX</a></div>` : ""}
      </aside>
    </div>
  </section>`;
  write(
    `publication/${publication.slug}/index.html`,
    page({
      title: publication.title,
      description: publication.summary,
      path: `/publication/${publication.slug}/`,
      content: detail,
      jsonLd: schema,
      type: "article",
      ogImage: hasOgImage,
    }),
  );
  if (publication.bibtex) {
    write(`publication/${publication.slug}/cite.bib`, `${publication.bibtex}\n`);
  }
}

const thesisSchema = {
  "@context": "https://schema.org",
  "@type": "Thesis",
  name: thesis.title,
  url: `${site.baseUrl}/project/thesis/`,
  dateCreated: "2026-06-04",
  abstract: thesis.abstract,
  author: {
    "@type": "Person",
    "@id": `${site.baseUrl}/#person`,
    name: site.name,
  },
  inSupportOf: "PhD in Advanced Computing, Energy and Plasmas",
  sourceOrganization: {
    "@type": "CollegeOrUniversity",
    name: thesis.institution,
  },
  sameAs: [
    "https://helvia.uco.es/handle/10396/36619",
    "https://dialnet.unirioja.es/servlet/tesis?codigo=404070",
  ],
};

const thesisContent = `
<section class="page-hero page-hero--detail">
  <div class="shell">
    <p class="eyebrow">Completed PhD thesis · ${escapeHtml(thesis.institution)}</p>
    <h1>${escapeHtml(thesis.title)}</h1>
    <p class="page-hero__lead">A thesis by compendium on supervised and multi-label learning from mobile phone and geolocation data.</p>
    ${linkButtons(thesis.links)}
  </div>
</section>
<article class="project-detail">
  <div class="shell shell--narrow">
    <div class="defence-grid" aria-label="Defence result">
      <div class="fact-card"><span>Defended</span><strong>${escapeHtml(thesis.defenceDate)}</strong></div>
      <div class="fact-card"><span>Grade</span><strong>${escapeHtml(thesis.grade)}</strong></div>
      <div class="fact-card"><span>Distinction</span><strong>${escapeHtml(thesis.mention)}</strong></div>
    </div>
    <dl class="metadata-list">
      <div><dt>Doctoral programme</dt><dd>${escapeHtml(thesis.programme)}</dd></div>
      <div><dt>Institution</dt><dd>${escapeHtml(thesis.institution)}</dd></div>
      <div><dt>Supervisor</dt><dd>${escapeHtml(thesis.supervisor)}</dd></div>
    </dl>
    <h2>Summary</h2>
    <p class="abstract">${escapeHtml(thesis.abstract)}</p>
    <h2>Core publications</h2>
    <div class="core-list">
      ${thesis.corePublications
        .map((slug) => publicationBySlug.get(slug))
        .map(
          (publication) => `<a class="core-item" href="/publication/${escapeHtml(publication.slug)}/">
            <span class="core-item__year">${escapeHtml(String(publication.year))}<br>${escapeHtml(publication.status)}</span>
            <span class="core-item__title">${escapeHtml(publication.title)}</span>
          </a>`,
        )
        .join("\n")}
    </div>
  </div>
</article>`;

write(
  "project/thesis/index.html",
  page({
    title: "PhD Thesis",
    description:
      "Completed PhD thesis by Manuel Mendoza Hurtado on population-pattern identification using mobile phone and geolocation data.",
    path: "/project/thesis/",
    content: thesisContent,
    jsonLd: thesisSchema,
    ogImage: hasOgImage,
  }),
);
write(
  "project/index.html",
  redirectPage("/project/", "/project/thesis/", hasOgImage),
);

const tags = [...new Set(publications.flatMap((publication) => publication.tags))]
  .sort((a, b) => slugLabel(a).localeCompare(slugLabel(b)))
  .map((tag) => ({
    slug: tag,
    label: slugLabel(tag),
    publications: publications.filter((publication) =>
      publication.tags.includes(tag),
    ),
  }));

write(
  "tags/index.html",
  page({
    title: "Research topics",
    description: "Research topics represented in the publication record.",
    path: "/tags/",
    content: `<section class="page-hero"><div class="shell"><p class="eyebrow">Research index</p><h1>Topics</h1><p class="page-hero__lead">Browse publications by subject.</p></div></section>
      <div class="shell tag-index">${tags.map((tag) => `<a href="/tag/${escapeHtml(tag.slug)}/">${escapeHtml(tag.label)} <span>${tag.publications.length}</span></a>`).join("\n")}</div>`,
    ogImage: hasOgImage,
  }),
);

for (const tag of tags) {
  write(
    `tag/${tag.slug}/index.html`,
    page({
      title: tag.label,
      description: `${tag.label} publications by ${site.name}.`,
      path: `/tag/${tag.slug}/`,
      content: `<section class="page-hero"><div class="shell"><p class="eyebrow">Research topic</p><h1>${escapeHtml(tag.label)}</h1><p class="page-hero__lead">${tag.publications.length} publication${tag.publications.length === 1 ? "" : "s"} in this topic.</p></div></section>
        <section class="archive-section"><div class="shell"><div class="publication-grid">${tag.publications.map((publication) => publicationCard(publication)).join("\n")}</div></div></section>`,
      ogImage: hasOgImage,
    }),
  );
}

for (const [path, destination] of [
  ["/categories/", "/tags/"],
  ["/categories/page/1/", "/tags/"],
  ["/tags/page/1/", "/tags/"],
  ["/publication/page/1/", "/publication/"],
  ["/publication-type/", "/publication/"],
  ["/publication-type/page/1/", "/publication/"],
  ["/publication_types/", "/publication/"],
  ["/publication_types/page/1/", "/publication/"],
  ["/tag/thesis/", "/project/thesis/"],
  ["/tag/thesis/page/1/", "/project/thesis/"],
]) {
  write(
    `${path.slice(1)}index.html`,
    redirectPage(path, destination, hasOgImage),
  );
}

const sitemapPaths = [
  "/",
  "/publication/",
  ...publications.map((publication) => `/publication/${publication.slug}/`),
  "/project/thesis/",
  "/tags/",
  ...tags.map((tag) => `/tag/${tag.slug}/`),
];
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPaths
  .map(
    (path) => `  <url>
    <loc>${absoluteUrl(path)}</loc>
    <changefreq>${path === "/" ? "monthly" : "yearly"}</changefreq>
  </url>`,
  )
  .join("\n")}
</urlset>
`,
);

function rssItem(publication) {
  const url = `${site.baseUrl}/publication/${publication.slug}/`;
  return `<item>
      <title>${escapeHtml(publication.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${publication.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeHtml(publication.summary)}</description>
    </item>`;
}

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeHtml(site.name)} — Publications</title>
    <link>${site.baseUrl}/publication/</link>
    <description>${escapeHtml(site.description)}</description>
    <language>en</language>
    ${publications.map(rssItem).join("\n    ")}
  </channel>
</rss>
`;
write("index.xml", rss);
write("publication/index.xml", rss);

write(
  "robots.txt",
  `User-agent: *
Allow: /

Sitemap: ${site.baseUrl}/sitemap.xml
`,
);
write(
  "manifest.webmanifest",
  `${JSON.stringify(
    {
      name: `${site.name} — Academic profile`,
      short_name: site.shortName,
      start_url: "/",
      display: "standalone",
      background_color: "#f7f3ec",
      theme_color: "#10283f",
      icons: [
        {
          src: "/media/icon_hu3518839863cab9d8db50f172980c2d5d_1651_192x192_fill_lanczos_center_2.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/media/icon_hu3518839863cab9d8db50f172980c2d5d_1651_512x512_fill_lanczos_center_2.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    null,
    2,
  )}\n`,
);
write(
  "_headers",
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/assets/*
  Cache-Control: public, max-age=86400
`,
);
write(
  "_redirects",
  `/publication_types/* /publication/ 301
/publication-type/* /publication/ 301
/categories/* /tags/ 301
`,
);
write(".nojekyll", "");
write(
  "404.html",
  page({
    title: "Page not found",
    description: "The requested page could not be found.",
    path: "/404.html",
    content: `<section class="simple-page"><div class="shell shell--narrow"><p class="eyebrow">404</p><h1>That page could not be found.</h1><p>The address may have changed. Visit the <a href="/">home page</a> or browse the <a href="/publication/">publication archive</a>.</p></div></section>`,
    ogImage: hasOgImage,
  }),
);

console.log(
  `Built ${sitemapPaths.length} canonical pages, ${publications.length} publication records and ${tags.length} tag archives.`,
);
