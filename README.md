# Minaw: Official Website

A one-page musician profile site built with plain HTML, CSS and JavaScript. There is no framework and no build step.

- **Live site:** https://minawph.pages.dev/
- **Version:** v4.9 (24 October 2026)

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
  background-desktop.webp   Hero photo for wide, high-density screens (2560 x 1440)
  background-desktop-1920.webp  Same photo for ordinary desktop and laptop screens (1920 x 1080)
  background-tablet.webp    Hero photo for portrait tablets (square, 1200 x 1200)
  background-mobile.webp    Hero photo for portrait phones (4:5, 1080 x 1350)
  background-mobile-720.webp  Same photo for phones with lower-density screens (720 x 900)
  portrait.webp             Bio and gallery photo (square, 1100 x 1100)
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

- [ ] Upcoming shows text
- [ ] Music: release titles, cover art, and the "Listen now" links
- [ ] News: replace the two "Coming soon" items as stories come in
- [ ] Gallery: replace the dashed placeholders with real photos (about 800 px wide, under 150 KB, WebP)
- [ ] Contact form: replace `YOUR_FORM_ID` (see below)

## Contact form

The form works like the one on AJR Dev Log. `script.js` checks the fields, then sends them to Formspree.

1. Create a form in Formspree and copy its ID.
2. In `index.html`, replace `YOUR_FORM_ID` in the form's `action`.
3. In Formspree, add `minawph.pages.dev` to the form's allowed domains. Messages from any other address go to Spam.
4. Keep CAPTCHA turned off, because the page sends the form with `fetch`.
5. Test on the live site, not a local copy.

Until step 2 is done, the Send button opens the visitor's email app instead.

## How it works

- **Hero photo:** A `<picture>` element picks the desktop, tablet or mobile image. On desktop and landscape the photo fills the hero and the name sits beside him. On phones and portrait tablets the name and tagline sit in their own band at the top and the photo is a fixed-shape block below it (4:5 on phones, square on tablets) that fades in from the page's navy at its top edge, so the text can never overlap him whatever the screen height, browser bars or font size. `script.js` reports where the text ends in `--hero-text-bottom`, and the hero's minimum height in `styles.css` keeps the whole photo visible. The phone and tablet images are plain crops with no baked-in fade, made from the square portrait photo (`portrait.webp`), which shows him larger and sharper than the desktop photo. To change them, crop to the same shape and keep his head at least 8% below the top edge, because the top 6% fades into the page. A soft navy tint over the desktop hero (in `.hero::after`) keeps the name readable where it crosses the light stripe.
- **Image sizes:** Each hero photo comes in more than one size, and the browser downloads only the one the screen needs (`srcset` and `sizes` in `index.html`): a 1920 px laptop gets an 89 KB file instead of a 479 KB one. All photos are WebP at quality 76 to 80, which looks the same as the originals on screen. When you replace a photo, make each size from your largest original and keep the file names. A good rule is to keep each hero image under about 140 KB.
- **Hero name:** It stays on one line (`white-space: nowrap`). `script.js` (`initHeroName`) measures the name's real width in whichever font is showing and sets the font size so it fills the available room (`--name-room` in `styles.css`), up to a ceiling set in CSS (`--name-max`: about 165 px on a wide desktop, 144 px on a tablet). The ceiling grows with the screen width so the end of the name stays clear of the light stripe in the photo. It re-fits when the web font finishes loading and when the window is resized. To make the name bigger or smaller, change `--name-max` (and `--name-room` for the space it may use).
- **Nav:** It stays pinned on tablets and desktops. On phones it is one row you can swipe, with arrow buttons at each end.
- **Fonts:** Josefin Sans (headings and titles) and Playfair Display (the italic tagline and lead lines) come from Google Fonts. The social icons use Font Awesome. To try another heading font, change the family name in the Google Fonts `<link>` in `index.html` and `--font-display` in `styles.css`; the hero name resizes itself to fit. Good alternatives for the same feel: Jost (closer to Futura), Righteous (rounded 70s style), Syncopate (very wide and retro-futuristic; the name will be smaller).
- **Security:** `index.html` has a Content Security Policy that lists what the page may load. If you add something new (a Spotify or YouTube embed, analytics, another font host), add its address to the policy, or the browser will block it.

## Publish

The site is hosted on Cloudflare Pages. Pushing to the `main` branch on GitHub redeploys it. After changing the share image or description, re-scrape the page in the Facebook Sharing Debugger, because platforms cache old previews.

## Release history

- **v4.9 (2026-10-24):** New wide desktop background made from the square portrait photo, so the desktop, tablet and phone images all match. The share image was resized from 3840 x 2160 (985 KB) to the standard 1200 x 630 (88 KB). Images optimized for faster loading: the desktop photo went from 479 KB to 89 KB (1920 px) or 133 KB (2560 px) and the browser picks by screen; phones get 53 KB (720 px) or 94 KB (1080 px) instead of 122 KB; the tablet photo went from 110 KB to 83 KB; the portrait from 193 KB to 74 KB.
- **v4.8 (2026-10-24):** Phone (4:5) and tablet (square) backgrounds rebuilt from the square portrait photo, which has more detail than the desktop photo. The fade at the top of the photo was shortened from 10% to 6% so his hair stays solid.
- **v4.7 (2026-10-24):** Fixed the name and tagline overlapping his head on real phones. On portrait phones and tablets the photo now sits below the text instead of behind it, so the layout no longer depends on screen height, browser bars or the exact crop. The phone and tablet images are now plain 4:5 and square crops.
- **v4.6 (2026-10-24):** New stage photo of Minaw with a microphone as the hero. The phone and tablet hero crops and the share image were rebuilt from it, the portrait is the new square one, and the alt text was updated to describe the new photo.
- **v4.5 (2026-10-23):** Hero name made much bigger (about 165 px on a wide desktop, up from 96 px); its maximum size is now set in CSS (`--name-max`). Facebook link added to the top bar beside Instagram. Contact email changed to minawph.music@gmail.com and the Messenger link updated.
- **v4.4 (2026-10-23):** New hero photo of Minaw, with the name, tagline, bio, Genre and Role updated to match. The phone and tablet hero crops, the Bio and Gallery portrait (now a true 4:5 crop) and the share image were rebuilt from the new photo. The hero text sits slightly further right to clear his glasses.
- **v4.3 (2026-10-23):** Heading font changed from Oswald to Josefin Sans, a geometric vintage-style typeface with wider letter spacing for a city pop feel. The hero name now sizes itself to fit on one line in any font.
- **v4.2 (2026-10-23):** New hero photo. The phone and tablet hero crops, the Bio and Gallery portrait and the share image were rebuilt from it, so every size shows the same pose. `background-desktop.jpg` is the full-quality copy of the hero photo; the site itself uses the `.webp` files.
- **v4.1 (2026-10-23):** New blue colour scheme taken from the hero photo, replacing the gold. Logo, favicons, share image, portrait and the mobile and tablet hero crops recoloured or rebuilt to match. CSS variables and the `.gold-rule` class renamed to neutral names (`--accent`, `.accent-rule`). Hero name now on a single line, with the size following the space available (about 93 px on a wide desktop, 34 px on a phone); on portrait phones and tablets it uses the full screen width.
- **v1 (2026-10-22):** Home, Music, News, Gallery, Bio and Contact sections. Responsive hero photo crops. Contact form with Formspree support and an email fallback. Share-preview tags.
