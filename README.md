# Anthony Joseph Robles: Official Website

A one-page musician profile site built with plain HTML, CSS and JavaScript. There is no framework and no build step.

- **Live site:** https://minawph.pages.dev/
- **Version:** v4.3 (23 October 2026)

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
  background-desktop.webp   Hero photo for wide screens and landscape (1376 x 768)
  background-desktop.jpg    Full-quality copy of the hero photo (not loaded by the page)
  background-tablet.webp    Hero photo for portrait tablets (3:4)
  background-mobile.webp    Hero photo for portrait phones (9:16)
  portrait.webp             Bio and gallery photo (cropped from the hero photo)
  favicon.svg               Sun mark: tab icon and header logo (sharp at any size)
  favicon-32/100/192/512.png  PNG versions of the sun mark for browsers that need them
  apple-touch-icon.png      iPhone home-screen icon
  logo-minaw.svg / .png     Full logo: sun with the MINAW wordmark
  og-image.jpg              Link preview image (1200 x 630)
```

## Run it locally

Open `index.html` in a browser. Fonts and the social icons load from the internet, so they only appear when you are online.

The contact form cannot be tested from a local file. See **Contact form** below.

## Colour palette

The colours are sampled from the hero photo (navy denim jacket, blue wall, steel-grey light). They all live as variables at the top of `styles.css`, so a change there updates the whole site.

| Variable | Value | Used for |
| --- | --- | --- |
| `--bg-dark` | `#070d16` | Page background |
| `--bg-bar` | `#04080f` | Top bar and footer |
| `--alt` | `#0b1420` | Alternate section background |
| `--ice` | `#e6edf5` | Hero name (light enough to read on the blue photo) |
| `--accent-soft` | `#a9c4e2` | Section titles |
| `--accent` | `#8fb2d9` | Links, tags, dates, icons, buttons, logo |
| `--accent-hover` | `#b4cde8` | Hover state |
| `--accent-line` | `#5f87b3` | Rules and underlines |
| `--text` / `--muted` | `#cfd8e3` / `#9aa8ba` | Body copy / secondary text |

If the hero photo changes, the logo files (`favicon*.png`, `logo-minaw.*`, `apple-touch-icon.png`), `og-image.jpg` and `portrait.webp` should be refreshed to match.

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

- **Hero photo:** A `<picture>` element picks the desktop, tablet or mobile crop. The mobile and tablet crops were made from the desktop photo, with the background extended upward and faded to navy to leave room for the name. A soft navy tint over the hero (in `.hero::after`) keeps the name readable where it crosses the light stripe.
- **Hero name:** It stays on one line (`white-space: nowrap`). `script.js` (`initHeroName`) measures the name's real width in whichever font is showing and sets the font size so it fills the available room (`--name-room` in `styles.css`), up to 96 px. It re-fits when the web font finishes loading and when the window is resized, so changing the font needs no recalculation. The size in the CSS is only a starting estimate for the instant before the script runs.
- **Nav:** It stays pinned on tablets and desktops. On phones it is one row you can swipe, with arrow buttons at each end.
- **Fonts:** Josefin Sans (headings and titles) and Playfair Display (the italic tagline and lead lines) come from Google Fonts. The social icons use Font Awesome. To try another heading font, change the family name in the Google Fonts `<link>` in `index.html` and `--font-display` in `styles.css`; the hero name resizes itself to fit. Good alternatives for the same feel: Jost (closer to Futura), Righteous (rounded 70s style), Syncopate (very wide and retro-futuristic; the name will be smaller).
- **Security:** `index.html` has a Content Security Policy that lists what the page may load. If you add something new (a Spotify or YouTube embed, analytics, another font host), add its address to the policy, or the browser will block it.

## Publish

The site is hosted on Cloudflare Pages. Pushing to the `main` branch on GitHub redeploys it. After changing the share image or description, re-scrape the page in the Facebook Sharing Debugger, because platforms cache old previews.

## Release history

- **v4.3 (2026-10-23):** Heading font changed from Oswald to Josefin Sans, a geometric vintage-style typeface with wider letter spacing for a city pop feel. The hero name now sizes itself to fit on one line in any font.
- **v4.2 (2026-10-23):** New hero photo. The phone and tablet hero crops, the Bio and Gallery portrait and the share image were rebuilt from it, so every size shows the same pose. `background-desktop.jpg` is the full-quality copy of the hero photo; the site itself uses the `.webp` files.
- **v4.1 (2026-10-23):** New blue colour scheme taken from the hero photo, replacing the gold. Logo, favicons, share image, portrait and the mobile and tablet hero crops recoloured or rebuilt to match. CSS variables and the `.gold-rule` class renamed to neutral names (`--accent`, `.accent-rule`). Hero name now on a single line, with the size following the space available (about 93 px on a wide desktop, 34 px on a phone); on portrait phones and tablets it uses the full screen width.
- **v1 (2026-10-22):** Home, Music, News, Gallery, Bio and Contact sections. Responsive hero photo crops. Contact form with Formspree support and an email fallback. Share-preview tags.
