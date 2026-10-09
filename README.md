# socially-web

The landing page for [Socially](../socially-apk): pick a Captain, join the Crew, keep your keys.

The page sits on a live sky rendered with WebGL: high clouds, a sea of clouds with open water
in its gaps, the sun or moon, and a sailboat. Each section sets its own time of day and
weather, and scrolling moves the camera forward. The design canvas with every scene, the
palettes and the scroll timeline is the reference for new sections.

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
| Sky       | Plain WebGL, one fragment shader, no 3D library                                        |
| Fonts     | Cormorant Garamond for display, Inter for UI, via `next/font`                          |

## Where things are

```
src/components/sky/        The sky: shader, presets, engine, provider, <SkyScene>, boat
src/components/sections/   Page sections and scenes.ts (one sky per section)
src/components/ui/         Shared controls
src/app/globals.css        Design tokens and the glass, navy-plate and eyebrow utilities
```

## Adding a section

1. Add its sky to `src/components/sections/scenes.ts` (time, weather, horizon, boat).
2. Wrap the section in `<SkyScene scene={scenes.yourSection}>`. The sky eases to that scene
   when the section crosses the middle of the viewport.
3. Put text on glass or in the top third of the sky, and check it against the brightest frame.

## Motion rules

- Entrances that matter for first paint use CSS (`animate-rise`), so they play before hydration.
- Everything interactive or scroll-linked uses Motion.
- `MotionConfig reducedMotion="user"` turns off transforms for visitors who ask for less motion;
  the sky then holds still frames and Lenis is off.
