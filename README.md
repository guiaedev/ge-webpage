# Guía Existencial — standalone website

Astro + TypeScript + custom CSS. Static HTML output, with no server or database required. Node.js 22.12+ recommended. Dependencies are locked in package-lock.json.

## Run and edit

npm ci
npm run dev
npm run build

The deployable output is dist/. The archive also includes this output under website/. Open website/index.html directly or serve that directory over HTTP. Fonts and illustrations are local, and core content and navigation remain usable without JavaScript. Topic dialogs and the pending-booking dialog use JavaScript.

## Content and architecture

- src/data/site.ts: booking URL, contact URL, topics and clinical team.
- src/components/: reusable Header, Hero, Topics, Process, Information, Footer and shared elements.
- src/styles/global.css: design tokens, typography, responsive layout, focus treatment and reduced-motion behavior.
- src/layouts/Layout.astro: language, metadata and favicon.
- src/pages/index.astro: page composition and small interaction script.
- scripts/portable.mjs: portable static export adjustments.

## Cal.com activation

The public Cal.com event has not been created. No live calendar is configured. For now, booking CTAs open an honest availability message with the current contact page link.

When the event is ready, set site.bookingUrl in src/data/site.ts to its complete https://cal.com/… URL, then run npm run build and redeploy dist/. All booking CTAs will link directly to the hosted Cal.com calendar. No API key is needed. This release prepares the URL integration; it does not embed a calendar, handle booking webhooks, take payments or create calendar events itself. An embedded calendar can be added once the actual event and desired flow are available.

## Assets

The companion assets-hq/ folder contains original generated botanical PNGs at native 1536 × 1024 resolution (not upscaled, not 4K). public/assets/ contains 960px and 1536px optimized WebP versions and locally hosted font files/licenses. Generated artwork is inspired by the approved direction; it is not a pixel-exact extraction from the design mockup. Site text and controls are HTML, not baked into the images.

Fonts: Libre Caslon Display and DM Sans, from Google Fonts, distributed under their included OFL licenses. The small brand mark is a proposed vector mark, not a recovered official logo. Clinical team names and credentials were transcribed from https://guiaexistencialpsic.com/services/ during the design review; descriptions are concise adaptations. Confirm final clinical copy and official branding before public launch.

## Deployment

Upload the complete website/ (or built dist/) directory to a static host. Keep index.html alongside assets/. No WordPress installation is required. Private Sites deployment, when available, is separate from the downloadable package. No analytics, trackers, patient data collection or third-party embed is loaded by this version.

## Validation

Astro type checks and static build; dependency audit; desktop and mobile layout review; booking fallback, topic dialog, menu, FAQ, image and font loading checks. Booking itself cannot be tested until the public Cal.com event exists.

## Parallax

The hero and footer artwork move gently on scroll; text and controls stay fixed in their normal layout. public/scripts/parallax.js uses passive scroll listeners and one requestAnimationFrame per pending update, skips offscreen sections, and limits movement to 36px on desktop / 14px on mobile. Reduced-motion preferences disable the effect, including preference changes while the page is open. CSS overscan prevents exposed edges.

The hero also has a slow 16-second botanical sway and up to 4px horizontal / 2.5px vertical pointer response on fine-pointer devices. These compose separately from scroll movement. The flowers move together because the botanical artwork is a single raster layer. Text never animates. Reduced-motion disables both sway and pointer response.
