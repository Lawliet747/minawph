# Minaw: Official Website

A one-page musician profile site built with plain HTML, CSS and JavaScript. There is no framework and no build step.

- **Live site:** https://minawph.pages.dev/
- **Version:** v5.6 (27 October 2026)

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

A navy theme that sits alongside the blues in the hero photo. All colours live as variables at the top of `styles.css`, so changing them there changes the whole site. Translucent overlays use the bare-number versions (`--navy-rgb`, `--accent-rgb` and so on), so keep those in step with the matching colour.

| Variable | Value | Used for |
| --- | --- | --- |
| `--bg-dark` | `#0a1a35` | Page background (also `--navy-rgb`) |
| `--bg-bar` | `#061429` | Top bar and footer (also `--panel-rgb`) |
| `--alt` | `#0e2244` | Alternate section background |
| `--tile` / `--tile-top` | `#112b52` / `#16335f` | Placeholder tiles and release covers |
| `--field` | `#081730` | Form fields |
| `--ice` | `#e9f1fc` | Hero name (light enough to read on the blue photo) |
| `--accent-soft` | `#a5c6f5` | Section titles |
| `--accent` | `#86b4f0` | Links, tags, dates, icons, buttons, logo (also `--accent-rgb`) |
| `--accent-hover` | `#bcd6f8` | Hover state |
| `--accent-line` | `#4f86cf` | Rules and underlines (also `--accent-line-rgb`) |
| `--text` / `--muted` | `#cdd9ec` / `#9db0cc` | Body copy / secondary text |

If you change `--accent` or `--bg-dark`, also regrade the photos (see Colour grade), refresh the logo files (`favicon*.png`, `favicon.svg`, `logo-minaw.*`) and `apple-touch-icon.png`, which carry those two colours, and the `theme-color` in `index.html`.

## Music cards

The Music section has the latest release (Obb) as a wide banner, then a carousel of the other 11 singles, newest first. On a wide screen three cards show at once, on a tablet two, and on a phone one with the next card peeking in. The arrows above the row move one screen of cards at a time and the counter shows where you are; on a phone you can just swipe, and with the row focused the left and right arrow keys work too. Without JavaScript the row still scrolls, and the arrows stay hidden.

- **Links:** every button opens that song's own YouTube video (the `youtu.be/...` link, without the tracking code YouTube adds when you share). The banner's second button opens the live performance at SM North Skydome.
- **Thumbnails:** each cover shows the video's YouTube thumbnail, loaded straight from YouTube's image server (`https://i.ytimg.com/vi/VIDEO-ID/hqdefault.jpg`; the banner asks for the larger `maxresdefault.jpg` first). The site's security policy in `index.html` allows that one address (`img-src`). If a thumbnail cannot load, `script.js` removes it and the navy placeholder with the sun mark and the year shows instead. The thumbnails are cropped to a 16:9 frame, which trims the black bars YouTube adds to some of them. To use your own cover art instead, replace the `<img class="thumb">` with your image (keep it 16:9, about 800 px wide, under 80 KB); once no thumbnails come from YouTube you can remove `https://i.ytimg.com` from `img-src`.
- **Adding a song:** copy one `<li class="release card">...</li>` block inside the carousel, change the title, year and video ID (the ID is the part after `youtu.be/`; it appears in the link and in both thumbnail addresses), and keep the list newest first. When a new single comes out, make it the banner and move the old banner into the carousel as a regular card.
- **"See all songs on YouTube"** under the carousel links to the channel address you gave.

The song years and the two durations came from Apple Music, Spotify and Shazam; the order inside 2021 is partly estimated.

## Footer

The footer has four parts: the logo with the tagline, the place and the social icons (Instagram, Facebook, X, YouTube, Spotify); an Explore column that links to each section; a Listen column (Spotify, Apple Music, YouTube); and a Bookings & contact column with the email address. A bottom bar holds the copyright line (the year updates itself) and Back to top. On a phone the columns stack in two, and the contact column spans the full width.

- **Where the details live:** the email address and the Messenger link appear in three places, so change all of them together: the Contact section, the form's fallback address (`data-fallback-email` on the form) and this footer. The social links (Instagram, Facebook, X, YouTube and Spotify) appear in the top bar and in the footer, so change both when one changes. On narrow tablets (768 to 860 px) the top bar icons are slightly narrower so all seven menu links still fit without scrolling.
- **Apple Music:** this link (`https://music.apple.com/artist/minaw/1549709229`) was found through a search, so click it once on the live site to confirm it opens the right artist page.
- **Adding a link:** copy one `<li>...</li>` inside a `.footer-links` list. For a new social icon, copy one of the `footer-socials` items and change the `fa-brands fa-...` icon name (the icon names are on the Font Awesome site).

## Still to fill in

Each item is marked with a `TODO` comment in `index.html`.

- [ ] Upcoming shows text
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

- **Hero photo:** A `<picture>` element picks the desktop, tablet or mobile image. On desktop and landscape the photo fills the hero and the name sits beside him. On phones and portrait tablets the name and tagline sit in their own band at the top and the photo is a fixed-shape block below it (4:5 on phones, square on tablets) that fades in from the page's navy at its top edge, so the text can never overlap him whatever the screen height, browser bars or font size. `script.js` reports where the text ends in `--hero-text-bottom`, and the hero's minimum height in `styles.css` keeps the whole photo visible. The phone and tablet images are plain crops with no baked-in fade, made from the square portrait photo (`portrait.webp`), which shows him larger and sharper than the desktop photo. To change them, crop to the same shape and keep his head at least 8% below the top edge, because the top 6% fades into the page. A soft navy tint over the desktop hero (in `.hero::after`) keeps the name readable where it crosses the light stripe. On phones the text band is kept compact (see the last block of `styles.css`) and the photo fills the height that is left, between 1.18 and 1.35 times its width, so the whole hero fits the first screen; to make the name bigger on phones, raise `--name-max` in that block.
- **Image sizes:** Each hero photo comes in more than one size, and the browser downloads only the one the screen needs (`srcset` and `sizes` in `index.html`): a 1920 px laptop gets an 89 KB file instead of a 479 KB one. All photos are WebP at quality 76 to 80, which looks the same as the originals on screen. When you replace a photo, make each size from your largest original and keep the file names. A good rule is to keep each hero image under about 140 KB.
- **Colour grade:** All the photos (the three hero backgrounds, the Bio and Gallery portrait and the share image) are colour-graded to the navy theme. Only the blue backdrop is regraded: deeper navy in the shadows, the site's sky-blue accent in the light beams and stripe. Skin, hair, the jacket and the microphone are left untouched, and the teal reflection in his glasses is kept. When you swap a photo, ask for the same grade so it matches the page, and grade the original before making the smaller sizes.
- **Hero name:** It stays on one line (`white-space: nowrap`). `script.js` (`initHeroName`) measures the name's real width in whichever font is showing and sets the font size so it fills the available room (`--name-room` in `styles.css`), up to a ceiling set in CSS (`--name-max`: about 165 px on a wide desktop, 144 px on a tablet). The ceiling grows with the screen width so the end of the name stays clear of the light stripe in the photo. It re-fits when the web font finishes loading and when the window is resized. To make the name bigger or smaller, change `--name-max` (and `--name-room` for the space it may use).
- **Nav:** It stays pinned on tablets and desktops. On phones it is one row you can swipe, with arrow buttons at each end and a soft fade on the side where more links are hidden (`script.js` sets `data-fade` on the row; the fade size is `--nav-fade` in `styles.css`).
- **Fonts:** Josefin Sans (headings and titles) and Playfair Display (the italic tagline and lead lines) come from Google Fonts. The social icons use Font Awesome. To try another heading font, change the family name in the Google Fonts `<link>` in `index.html` and `--font-display` in `styles.css`; the hero name resizes itself to fit. Good alternatives for the same feel: Jost (closer to Futura), Righteous (rounded 70s style), Syncopate (very wide and retro-futuristic; the name will be smaller).
- **Security:** `index.html` has a Content Security Policy that lists what the page may load. If you add something new (a Spotify or YouTube embed, analytics, another font host), add its address to the policy, or the browser will block it.

## Publish

The site is hosted on Cloudflare Pages. Pushing to the `main` branch on GitHub redeploys it. After changing the share image or description, re-scrape the page in the Facebook Sharing Debugger, because platforms cache old previews.

## Release history

- **v5.6 (2026-10-27):** The phone menu row now fades out softly at the edge where more links are hidden, instead of cutting a word off mid-letter. The fade shows only on the side with hidden links and disappears when the whole menu fits. The 22 October News entry also gained a short, plain-language update (dated 28 Oct) about the new look, the songs and where to follow Minaw.
- **v5.5 (2026-10-27):** Added the X (Twitter) account, @MinawPH, to the top bar and the footer, after Facebook. The top bar icons are slightly tighter on narrow tablets so the whole menu still fits. On phones the name and tagline band above the photo is more compact (less space above the name, a 64 px name, a tighter tagline), and the photo takes the room that is left, so the Upcoming Shows panel now fits in the first screen even with the browser bars showing.
- **v5.4 (2026-10-26):** The footer is now a full footer instead of a single copyright line: logo and tagline, social icons, Explore, Listen (including Apple Music) and Bookings & contact columns, and a bottom bar with the copyright and Back to top. It collapses cleanly on tablets and phones.
- **v5.3 (2026-10-26):** The Music section is now the latest release as a banner plus a swipeable carousel of the other 11 singles (arrows, a position counter, one card at a time on phones). Every button links to the song's exact YouTube video, and each cover uses that video's YouTube thumbnail, with the placeholder as a fallback. "Mukha Ng Diyos" was removed, which makes 12 songs, matching the Bio. The security policy now allows images from YouTube's image server.
- **v5.2 (2026-10-25):** Music section filled in with 13 release cards built from Minaw's catalogue (Obb, Sasabihin, Palayo, Konteksto, Papansin, Hiya, Distansya, Luna, Tabi, Koneksyon, Mukha Ng Diyos, Hinga, Pagitan). The latest release is a banner with a link to the live version of Obb; each card links to YouTube. The section intro now reads "Singles, newest first."
- **v5.1 (2026-10-25):** The navy theme now extends to the photos. The desktop, tablet and phone backgrounds, the portrait and the share image are colour-graded: a deeper navy backdrop with sky-blue accents in the light, while skin tones, hair, clothing and eye colour are unchanged. File sizes are about the same as v5.
- **v5 (2026-10-25):** The theme moved from near-black to a richer navy blue (page, top bar, footer, sections, overlays and form fields), with a slightly brighter sky-blue accent. All colours are now variables in one place, including the translucent overlays. The logo, favicons and Apple icon were recoloured to match. Contrast stays high (body text 12:1, accent 8:1 on the page background).
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
