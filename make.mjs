// Writes one redirect page per old Wix address. Run: node make.mjs
import { mkdirSync, writeFileSync } from "node:fs";

const SITE = "https://pra.edu.vn";

// old palmriveracademy.edu.vn path -> new pra.edu.vn path
const map = {
  "/": "/",
  "/about": "/about/",
  "/admissions": "/admissions/",
  "/enrollment-fees": "/admissions/tuition-and-fees/",
  "/faq": "/admissions/",
  "/book-online": "/contact/",
  "/contact": "/contact/",
  "/calendar": "/families/calendar/",
  "/family-handbook": "/families/handbook/",
  "/schedule": "/families/schedule/",
  "/early-years": "/learning/early-years/",
  "/primary": "/learning/primary/",
  "/lower-secondary": "/learning/lower-secondary/",
  "/upper-secondary": "/learning/upper-secondary/",
  "/global-program": "/learning/global-program/",
  "/blog": "/events/",
  "/post/reflections-on-independence": "/events/",
  "/post/visiting-thailand-a-memorable-student-trip": "/events/",
  // Wix-only pages with no match on the new site
  "/pemdas": "/",
  "/powers10": "/",
  "/powers100": "/",
  "/algebra": "/",
  "/factor": "/",
  "/old": "/",
  "/down-for-maintenance": "/",
};

const page = (to) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Palm River Academy has moved</title>
<link rel="canonical" href="${to}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${to}">
<script>location.replace(${JSON.stringify(to)} + location.hash);</script>
<style>body{font:16px/1.5 system-ui,sans-serif;margin:3rem 1rem;text-align:center;color:#1d3557}a{color:#1d6fb8}</style>
</head>
<body>
<p>Palm River Academy's website is now at <a href="${to}">pra.edu.vn</a>.</p>
</body>
</html>
`;

for (const [from, to] of Object.entries(map)) {
  const dir = "site" + from;
  mkdirSync(dir, { recursive: true });
  writeFileSync(dir.replace(/\/$/, "") + "/index.html", page(SITE + to));
}

// Any other address goes to the home page.
writeFileSync("site/404.html", page(SITE + "/"));
writeFileSync("site/CNAME", "palmriveracademy.edu.vn\n");
writeFileSync("site/.nojekyll", "");
console.log(`Wrote ${Object.keys(map).length} redirect pages.`);
