import { publications, site, thesis } from "../site-src/data.mjs";

const urls = [
  site.affiliation.profile,
  ...site.social.map(({ url }) => url),
  ...thesis.links.map(({ url }) => url),
  ...publications.flatMap((publication) => [
    ...publication.links.map(({ url }) => url),
    ...(publication.doi ? [`https://doi.org/${publication.doi}`] : []),
  ]),
].filter((url) => /^https?:\/\//.test(url));

const uniqueUrls = [...new Set(urls)];
const failures = [];

async function check(url) {
  const options = {
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; AcademicSiteLinkCheck/1.0; +https://mendozamanu.github.io)",
    },
  };
  let response = await fetch(url, { ...options, method: "HEAD" });
  if ([403, 405, 429, 999].includes(response.status)) {
    response = await fetch(url, {
      ...options,
      method: "GET",
      headers: { ...options.headers, range: "bytes=0-0" },
    });
    await response.body?.cancel();
  }
  const reachable =
    (response.status === 999 ||
      (response.status >= 200 && response.status < 500)) &&
    ![404, 410, 451].includes(response.status);
  if (!reachable) {
    failures.push(`${response.status} ${url}`);
  }
  return `${reachable ? "OK" : "FAIL"} ${response.status} ${url}`;
}

for (let index = 0; index < uniqueUrls.length; index += 5) {
  const batch = uniqueUrls.slice(index, index + 5);
  const results = await Promise.all(
    batch.map(async (url) => {
      try {
        return await check(url);
      } catch (error) {
        failures.push(`ERROR ${url}: ${error.message}`);
        return `FAIL ERROR ${url}`;
      }
    }),
  );
  for (const result of results) console.log(result);
}

if (failures.length) {
  console.error(`\n${failures.length} external link(s) failed:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`\nExternal link check passed for ${uniqueUrls.length} URLs.`);
