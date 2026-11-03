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

public/assets/ contains the illustrations, responsive WebP sizes, downloadable PDFs, fonts and licenses used by the current site. Unused artwork variants, high-resolution working originals and design explorations have been removed from the project. Site text and controls are HTML, not baked into the images.

Fonts: Libre Caslon Display and DM Sans, from Google Fonts, distributed under their included OFL licenses. The small brand mark is a proposed vector mark, not a recovered official logo. Clinical team names and credentials were transcribed from https://guiaexistencialpsic.com/services/ during the design review; descriptions are concise adaptations. Confirm final clinical copy and official branding before public launch.

## Deployment

Upload the complete website/ (or built dist/) directory to a static host. Keep index.html alongside assets/. No WordPress installation is required. Private Sites deployment, when available, is separate from the downloadable package. No analytics, trackers, patient data collection or third-party embed is loaded by this version.

## Validation

Astro type checks and static build; dependency audit; desktop and mobile layout review; booking fallback, topic dialog, menu, FAQ, image and font loading checks. Booking itself cannot be tested until the public Cal.com event exists.

## Ambient motion

Desktop parallax is capped at 18px for the hero and 10px for the team and Nosotras artwork. The footer stays still. Parallax is disabled on mobile and for reduced-motion preferences, including live preference changes.

The hero has one slow butterfly entrance followed by a stationary perch with slight wing movement. Footer and mobile butterflies stay still. Two faint glows per section pulse slowly on desktop; mobile and reduced-motion layouts hide them. FAQ and other interaction-driven transitions remain available with reduced-motion support.

## Team cards

The team section uses the original initials and text cards, without portraits. Botanical hero/footer artwork and motion effects are retained.

## Small profile avatars

The original 52px profile circles contain original black-ink doodle avatars with coral cheeks, based on each supplied member photo. No large portrait panels are used. Generated with built-in imagegen: square, simplified black/ivory/coral/sage head-and-shoulders art with individual hairstyles and glasses, suitable for circular clipping. The active optimized WebP avatars are in public/assets/.
