# palmriveracademy.edu.vn redirect

Sends every address on the old Wix domain, palmriveracademy.edu.vn, to the matching page on https://pra.edu.vn. The website itself lives in BowenPRA/website.

- Add or change an address in the `map` in `make.mjs`, run `node make.mjs`, commit and push.
- Netlify (project palmriveracademy-redirect, BowenPRA's team) serves both palmriveracademy.edu.vn and www with real 301s from `site/_redirects`. Redeploy after a change: `npx netlify-cli deploy --prod --dir site --site deeba07f-bf09-4c1d-a043-c2363892d7c1`. GitHub Pages was used first but never issued a certificate for www.
- The main address is www.palmriveracademy.edu.vn (GitHub would not put www in the certificate when the bare domain was the main one); the bare domain redirects to it. DNS for palmriveracademy.edu.vn is kept at Wix. Only the apex A records and the `www` CNAME point here; the Google Workspace MX and SPF records must stay as they are.
