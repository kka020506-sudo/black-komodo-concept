# Black Komodo Investments: redesign concept

Unofficial redesign concept. Not published by or affiliated with Black Komodo Investments.

Next.js (App Router, static export), Tailwind CSS v4 and Motion. Same seven pages and wording as the firm's current site, with a new design and scroll animation.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Where things are

- `lib/site.ts`: all copy (the firm's own wording, typos fixed)
- `app/`: the seven pages plus photo credits
- `components/motion.tsx`: scroll and reveal animations; `components/FlowField.tsx`: the hero's moving lines
- `public/img/`: stand-in photographs from Wikimedia Commons (credits in `lib/credits.json`)

## Before this could go live

- Forms are demos and send nothing.
- Papers link to the contact form; attach the real PDFs.
- Replace the stand-in photographs and the drawn "K" mark with the firm's own.
- The research page keeps the firm's "market beating returns" line; check it with compliance.
