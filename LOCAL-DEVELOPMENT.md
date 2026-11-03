# Guía Existencial

Run `npm ci`, then `npm run dev`. Build with `npm run build`.

Source: `src/`. Web assets: `public/assets/`. Standalone built website: `dist/`. Unused originals and design previews were removed during asset cleanup. Git history and Sites configuration are preserved. Dependencies and development caches were omitted.

The compact storybook topic cards are implemented. Cal.com opens in a native booking modal and loads its official embed on demand. Set the public https://cal.com/account/event URL in `bookingUrl` in `src/data/site.ts` to activate real availability. Until then, the modal offers the current contact page. No API key is required. Verify the real calendar after configuring the URL.

Live site: https://guia-existencial-propuesta.imismaelhdz.chatgpt.site/

`guia-existencial.zip` contains the latest packaged website, source, and assets.
