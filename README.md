# Anthony Joseph Robles: Official Website

A one-page musician profile site built with plain HTML, CSS and JavaScript. There is no framework and no build step.

- **Live site:** https://minawph.pages.dev/
- **Version:** v1 (22 October 2026)

## What's on the page

| Section | What it shows |
| --- | --- |
| Home | Hero photo, name, tagline and the Upcoming Shows panel |
| Music | Release cards |
| News | Dated updates, newest first |
| Gallery | Photo grid |
| Bio | Portrait, short story and quick facts |
| Contact | Email, Messenger and a message form (Formspree) |

## Files

```
index.html     Page content and structure
styles.css     Colours, fonts, layout, responsive rules
script.js      Nav highlighting, footer year, contact form
img/
  background-desktop.webp   Hero photo for wide screens and landscape
  background-tablet.webp    Hero photo for portrait tablets (3:4)
  background-mobile.webp    Hero photo for portrait phones (9:16)
  portrait.webp             Bio and gallery photo
  favicon.svg               Sun mark: tab icon and header logo (sharp at any size)
  favicon-32/100/192/512.png  PNG versions of the sun mark for browsers that need them
  apple-touch-icon.png      iPhone home-screen icon
  logo-minaw.svg / .png     Full logo: sun with the MINAW wordmark
  og-image.jpg              Link preview image (1200 x 630)
```

## Run it locally

Open `index.html` in a browser. Fonts and the social icons load from the internet, so they only appear when you are online.

The contact form cannot be tested from a local file. See **Contact form** below.

## Still to fill in

Each item is marked with a `TODO` comment in `index.html`.

- [ ] Tagline under the name (currently a placeholder)
- [ ] Upcoming shows text
- [ ] Music: release titles, cover art, and the "Listen now" links
- [ ] News: replace the two "Coming soon" items as stories come in
- [ ] Gallery: replace the dashed placeholders with real photos (about 800 px wide, under 150 KB, WebP)
- [ ] Bio: write the story, then fill in Genre and Role
- [ ] Social icons: Instagram, YouTube and Spotify links, with `target="_blank" rel="noopener noreferrer"`
- [ ] Contact form: replace `YOUR_FORM_ID` (see below)
- [ ] Confirm the email address used in the Contact section

## Contact form

The form works like the one on AJR Dev Log. `script.js` checks the fields, then sends them to Formspree.

1. Create a form in Formspree and copy its ID.
2. In `index.html`, replace `YOUR_FORM_ID` in the form's `action`.
3. In Formspree, add `minawph.pages.dev` to the form's allowed domains. Messages from any other address go to Spam.
4. Keep CAPTCHA turned off, because the page sends the form with `fetch`.
5. Test on the live site, not a local copy.

Until step 2 is done, the Send button opens the visitor's email app instead.

## How it works

- **Hero photo:** A `<picture>` element picks the desktop, tablet or mobile crop. The mobile and tablet crops were made from the desktop photo, with the dark background extended upward to leave room for the name.
- **Nav:** It stays pinned on tablets and desktops. On phones it is one row you can swipe, with arrow buttons at each end.
- **Fonts:** Oswald and Playfair Display come from Google Fonts. The social icons use Font Awesome.
- **Security:** `index.html` has a Content Security Policy that lists what the page may load. If you add something new (a Spotify or YouTube embed, analytics, another font host), add its address to the policy, or the browser will block it.

## Publish

The site is hosted on Cloudflare Pages. Pushing to the `main` branch on GitHub redeploys it. After changing the share image or description, re-scrape the page in the Facebook Sharing Debugger, because platforms cache old previews.

## Release history

- **v1 (2026-10-22):** Home, Music, News, Gallery, Bio and Contact sections. Responsive hero photo crops. Contact form with Formspree support and an email fallback. Share-preview tags.
