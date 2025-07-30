# Link Preview Card - Next.js RSC Demo

This is a Next.js demo application showcasing the `@ldlfylt/link-preview-card` component with React Server Components (RSC).

## Features

- **True RSC Demo**: Uses the actual async `LinkPreview` component
- **Server-side rendering**: Zero JavaScript sent to browser
- **No CORS issues**: Server-side fetching of meta data
- **Multiple themes**: Card and inline theme examples
- **Real-time previews**: Live examples from popular websites

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Differences from Client Demo

- Uses the actual `LinkPreview` component (async function)
- Server-side rendering with zero client JavaScript
- No CORS issues since fetching happens on the server
- True RSC implementation

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- @ldlfylt/link-preview-card

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This demo can be deployed to Vercel, Netlify, or any other platform that supports Next.js. 