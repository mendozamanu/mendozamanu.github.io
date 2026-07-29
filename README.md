# Manuel Mendoza Hurtado - academic website

This repository publishes the static website at
<https://mendozamanu.github.io>. Canonical profile, thesis and publication data
live in `site-src/data.mjs`; reusable HTML templates and styles live beside it.

## Build

The project has no runtime or package dependencies. Node.js 22 or newer is
required.

```powershell
npm run build
npm run check
npm run check:external
```

`npm run build` replaces only known generated output directories and root
artifacts. It preserves the source, portrait, institutional logos and public CV.
The generated root files are committed because GitHub Pages serves the `master`
branch directly. The external-link check requires network access and may be
affected by publisher rate limits.

## Public CV

The English public CV is generated with ReportLab:

```powershell
python scripts/build-public-cv.py
```

Its deployable path is `files/manuel-mendoza-hurtado-cv.pdf`. Do not add raw CVA
exports or private identity data to this repository.
