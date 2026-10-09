# socially-web

The landing page for [Socially](../socially-apk): pick a Captain, join the Crew, keep your keys.

The layout is being re-planned from wireframes before the high-fidelity design. Sections
in `src/components/sections` are the current working draft.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run lint
npm run format       # Prettier, with Tailwind class sorting
```

## Stack

| Concern   | Choice                                                                                 |
| --------- | -------------------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19, TypeScript                                          |
| Styling   | Tailwind CSS 4. Brand tokens live in `src/app/globals.css`; the default palette is off |
| Motion    | Motion (`motion/react`) for interaction, presence and scroll-linked values             |
| Scrolling | Lenis, driven by Motion's frame loop                                                   |
| Fonts     | Cormorant Garamond for display, Inter for UI, via `next/font`                          |

## Where things are

```
src/components/sections/   Page sections
src/components/ui/         Shared controls
src/app/globals.css        Design tokens and the glass, navy-plate and eyebrow utilities
```

## Motion rules

- Entrances that matter for first paint use CSS (`animate-rise`), so they play before hydration.
- Everything interactive or scroll-linked uses Motion.
- `MotionConfig reducedMotion="user"` turns off transforms for visitors who ask for less motion,
  and Lenis is off.
