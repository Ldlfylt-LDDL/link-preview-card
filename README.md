# 🔗 Link Preview Card

> RSC-ready · Zero-JS · Tailwind-first · <5 KB gzip

A 1-tag React component that renders beautiful link previews from any URL.
Supports [React Server Components](https://react.dev/reference/react/experimental_taint-server-components), works without any client-side JavaScript, and uses no proxy by default.

## ✨ Features

- ✅ RSC + SSR ready – zero JS sent to browser
- ✅ No CORS proxy – uses a lightweight HTML fetcher by default
- ✅ Headless & themeable – Tailwind-based card/inline rendering
- ✅ Optional fetcher – plug in `link-preview-js`, Microlink API, etc.
- ✅ 100% TypeScript · <2 KB core size
- ✅ **Highly configurable** – extensive display, style, and interaction options
- ✅ **Flexible error handling** – custom error components
- ✅ **RSC compatible** – fully server-side rendered with no client-side state

## 📦 Installation

```bash
npm i @ldlfylt/link-preview-card
```
📘 Requires React 19+ & Tailwind CSS v4

## 🧪 Quick Usage
```tsx
import { LinkPreview } from "@ldlfylt/link-preview-card";

export default async function Example() {
    return (
        <LinkPreview url="https://vercel.com" />
    );
}
```

## 🎮 Live Demo

Check out the [interactive demo](examples/next-demo/) to see the component in action with server-side rendering:

```bash
cd examples/next-demo
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

This demo showcases the true RSC experience with server-side fetching and zero client-side JavaScript.

## 🎨 Tailwind v4 Setup (IMPORTANT)
If you're using Tailwind CSS v4, you must tell it to scan this package's output:

```css
/* app/globals.css */
@import "tailwindcss";
@source "../../node_modules/@ldlfylt/link-preview-card/dist/**/*.{js,cjs,mjs}";
```
Then restart dev server.

This ensures your project recognizes the Tailwind class names defined inside this package (e.g. rounded, text-gray-500, etc.)

## ⚙️ Props

### Basic Props
| Prop        | 	Type	                              | Default      | 	Description                        |
|-------------|-------------------------------------|--------------|-------------------------------------|
| `url`	      | `string`	                           | (required)   | 	URL to preview                     |
| `theme`	    | `"card"` \| `"card2"` \| `"inline"` \| `"inline-domain"` \| `"inline-tooltip"` \| `"none"` | 	`"card"`    | 	Layout style                       |
| `fetcher`   | 	`(url) => Promise\<MetaData\>`     | 	`fetchMeta` | 	Custom meta fetch logic            |                 
| `refresh`   | 	`number`	                          | `86400`      | 	Cache TTL in seconds               |  
| `fallback`	 | `React.ReactNode`	                  | `null`       | 	UI to render when error or timeout |                          
| `className` | 	`string`	                          | `""`	        | Extra Tailwind classes to pass in   |    

### Advanced Configuration

#### Display Configuration (`display`)
Control what content is shown and how it's formatted:

```tsx
<LinkPreview 
  url="https://github.com"
  display={{
    showTitle: true,           // Show/hide title
    showDescription: true,     // Show/hide description
    showImage: true,          // Show/hide image
    showIcon: true,           // Show/hide favicon
    showDomain: true,         // Show/hide domain
    showSiteName: false,      // Show/hide site name
    maxTitleLength: 100,      // Truncate title at N characters
    maxDescriptionLength: 150, // Truncate description at N characters
    imageHeight: "auto",      // Custom image height
    imageWidth: "auto"        // Custom image width
  }}
/>
```

#### Style Configuration (`style`)
Customize the visual appearance:

```tsx
<LinkPreview 
  url="https://github.com"
  style={{
    cardWidth: "max-w-3xl",     // Card width class
    cardHeight: "auto",         // Card height
    borderRadius: "rounded-lg",  // Border radius class
    shadow: "shadow-sm",        // Shadow class
    hoverEffect: true,          // Enable/disable hover effects
    imageHeight: "200px",       // Image height
    imageWidth: "300px",        // Image width
    customStyles: {             // Custom CSS styles
      backgroundColor: "#f8fafc"
    }
  }}
/>
```

#### Interaction Configuration (`interaction`)
Control link behavior:

```tsx
<LinkPreview 
  url="https://github.com"
  interaction={{
    openInNewTab: true,        // Open in new tab
    disableLink: false         // Disable link functionality
  }}
/>
```

#### Error Configuration (`error`)
Handle errors gracefully:

```tsx
<LinkPreview 
  url="https://github.com"
  error={{
    showError: true,                      // Show/hide error state
    errorText: "Failed to load preview",  // Error text
    errorComponent: (                     // Custom error component
      <div className="custom-error">
        ❌ Failed to load
      </div>
    )
  }}
/>
```

#### Advanced Options
```tsx
<LinkPreview 
  url="https://github.com"
  cacheKey="custom-key"      // Custom cache key
  cacheExpiry={3600}         // Cache expiry in seconds
  timeout={5000}             // Request timeout in ms
  userAgent="Custom Agent"   // Custom user agent
  proxy="https://proxy.com"  // Custom proxy URL
/>
```

## 🎨 Theme Examples

### Card Theme (Default)
```tsx
<LinkPreview url="https://github.com" theme="card" />
```

### Card2 Theme (Compact)
```tsx
<LinkPreview url="https://github.com" theme="card2" />
```

### Inline Themes
```tsx
{/* Basic inline */}
<LinkPreview url="https://github.com" theme="inline" />

{/* With domain */}
<LinkPreview url="https://github.com" theme="inline-domain" />

{/* With tooltip */}
<LinkPreview url="https://github.com" theme="inline-tooltip" />
```

## 🧠 How It Works
* Fetches the given URL from server side using fetchMeta()

* Extracts og:title, og:image, description, favicon, etc.

* Renders as HTML-only, no client hydration needed

* Gracefully falls back when site is protected or missing meta tags

* You can override everything via fetcher + theme

## 🔧 Advanced Usage

### Custom Fetcher
```tsx
import { LinkPreview } from "@ldlfylt/link-preview-card";

export default async function Example() {
  return (
    <LinkPreview
      url="https://leetcode.com"
      fetcher={myEdgeFetcher}
    />
  );
}
```

### Complex Configuration Example
```tsx
<LinkPreview 
  url="https://github.com"
  theme="card2"
  display={{
    showSiteName: true,
    maxTitleLength: 40,
    maxDescriptionLength: 80
  }}
  style={{
    cardWidth: "max-w-sm",
    borderRadius: "rounded-xl",
    shadow: "shadow-md",
    hoverEffect: true,
    imageHeight: "150px"
  }}
  interaction={{
    openInNewTab: true
  }}
  error={{
    errorText: "Load Failed"
  }}
  className="my-4"
/>
```

## 📚 Examples

Check out the [advanced usage examples](examples/advanced-usage.tsx) for more detailed configuration examples.

## 🚀 RSC Compatibility

This component is fully compatible with React Server Components:

- ✅ **Server-side rendering** - No client-side JavaScript required
- ✅ **Async/await support** - Uses async function for data fetching
- ✅ **No useState/useEffect** - Pure server-side component
- ✅ **Zero hydration** - Renders complete HTML on server
- ✅ **SEO friendly** - Search engines can see all content

For client-side interactivity, wrap this component in a client component:

```tsx
'use client';
import { LinkPreview } from "@ldlfylt/link-preview-card";

export function ClientLinkPreview({ url }: { url: string }) {
  return <LinkPreview url={url} />;
}
```
