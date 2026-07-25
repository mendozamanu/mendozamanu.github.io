import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { publications, site } from "../site-src/data.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const requiredRoutes = [
  "/",
  "/publication/",
  "/project/thesis/",
  ...publications.map((publication) => `/publication/${publication.slug}/`),
];
const generatedHtml = [];

function fileForRoute(route) {
  return route === "/"
    ? join(root, "index.html")
    : join(root, route.slice(1), "index.html");
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

for (const route of requiredRoutes) {
  const file = fileForRoute(route);
  assert(existsSync(file), `Missing required route ${route}`);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  generatedHtml.push([route, html]);
  const expectedCanonical = `${site.baseUrl}${route}`;
  assert(
    html.includes(`<link rel="canonical" href="${expectedCanonical}">`),
    `${route} has an incorrect canonical URL`,
  );
  assert(
    html.includes('type="application/ld+json"'),
    `${route} is missing JSON-LD`,
  );
}

const publicationArchive = readFileSync(
  join(root, "publication", "index.html"),
  "utf8",
);
for (const publication of publications) {
  assert(
    publicationArchive.includes(
      `/publication/${publication.slug}/`,
    ) && publicationArchive.includes(publication.title),
    `Publication archive is missing ${publication.slug}`,
  );
  if (publication.bibtex) {
    const bibtex = join(
      root,
      "publication",
      publication.slug,
      "cite.bib",
    );
    assert(existsSync(bibtex), `Missing BibTeX for ${publication.slug}`);
    assert(
      existsSync(bibtex) && statSync(bibtex).size > 80,
      `BibTeX for ${publication.slug} is empty`,
    );
  }
}

const stalePhrases = [
  "PhD Researcher",
  "defence expected",
  "under revision",
  "Information Processing &amp; Management",
  "Information Processing & Management",
  "i52mehum@uco.es",
  "Rabanales",
];
for (const [route, html] of generatedHtml) {
  for (const phrase of stalePhrases) {
    assert(!html.includes(phrase), `${route} contains stale phrase: ${phrase}`);
  }
}

const allHtml = [];
const pending = [root];
const ignoredDirectories = new Set([".git", "site-src", "scripts"]);
while (pending.length) {
  const directory = pending.pop();
  for (const item of await import("node:fs").then(({ readdirSync }) =>
    readdirSync(directory, { withFileTypes: true }),
  )) {
    if (item.name === ".git") continue;
    const path = join(directory, item.name);
    if (item.isDirectory()) {
      if (!ignoredDirectories.has(item.name)) pending.push(path);
    } else if (item.name.endsWith(".html")) {
      allHtml.push([path, readFileSync(path, "utf8")]);
    }
  }
}

for (const [file, html] of allHtml) {
  const hrefPattern = /(?:href|src)="([^"]+)"/g;
  for (const match of html.matchAll(hrefPattern)) {
    const target = match[1];
    if (
      !target.startsWith("/") ||
      target.startsWith("//") ||
      target.startsWith("/#")
    ) {
      continue;
    }
    const cleanTarget = target.split("#")[0].split("?")[0];
    if (!cleanTarget) continue;
    const localPath = cleanTarget.endsWith("/")
      ? join(root, cleanTarget.slice(1), "index.html")
      : join(root, cleanTarget.slice(1));
    assert(
      existsSync(localPath),
      `${file.slice(root.length + 1)} links to missing ${cleanTarget}`,
    );
  }
}

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
for (const route of requiredRoutes) {
  assert(
    sitemap.includes(`<loc>${site.baseUrl}${route}</loc>`),
    `Sitemap is missing ${route}`,
  );
}

const home = readFileSync(join(root, "index.html"), "utf8");
assert(home.includes(`mailto:${site.email}`), "Homepage is missing direct email");
assert(
  home.includes("Sobresaliente cum laude") &&
    home.includes("International Mention") &&
    home.includes("4 June 2026"),
  "Homepage is missing the completed defence details",
);
assert(
  home.includes(site.cv),
  "Homepage does not link to the sanitized public CV",
);
assert(
  existsSync(join(root, site.cv.slice(1))),
  "Sanitized public CV file is missing",
);
assert(
  !existsSync(join(root, "files", "resume.pdf")) &&
    !existsSync(join(root, "uploads", "resume.pdf")),
  "A legacy resume.pdf still exists in the working tree",
);

if (errors.length) {
  console.error(`Site check failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Site check passed: ${requiredRoutes.length} required routes, ${publications.length} publication records, ${allHtml.length} HTML files.`,
);
