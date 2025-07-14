# 🔗 Link Preview Card

> RSC-ready · Zero-JS · Tailwind-first · <5 KB gzip

A 1-tag React component that renders beautiful link previews from any URL.
Supports [React Server Components](https://react.dev/reference/react/experimental_taint-server-components), works without any client-side JavaScript, and uses no proxy by default.

---

## ✨ Features

- ✅ RSC + SSR ready – zero JS sent to browser
- ✅ No CORS proxy – uses a lightweight HTML fetcher by default
- ✅ Headless & themeable – Tailwind-based card/inline rendering
- ✅ Optional fetcher – plug in `link-preview-js`, Microlink API, etc.
- ✅ Fallback-safe – shows skeleton / link / error when needed
- ✅ Built-in LRU/TTL cache support (planned)
- ✅ 100% TypeScript · <5 KB core size

---

## 📦 Installation

```bash
npm install link-preview-card
# or
pnpm add link-preview-card
```
📘 Requires React 19+ & Tailwind CSS v4

## 🧪 Quick Usage
```tsx
import { LinkPreview } from "link-preview-card";

export default function Example() {
    return (
    <LinkPreview url="https://vercel.com" />
    );
}
```
## 🎨 Tailwind v4 Setup (IMPORTANT)
If you're using Tailwind CSS v4, you must tell it to scan this package's output:

```css
/* app/globals.css */
@source "../node_modules/link-preview-card/dist/**/*.{js,cjs,mjs}";
```
Then restart dev server.

This ensures your project recognizes the Tailwind class names defined inside this package (e.g. rounded, text-gray-500, etc.)

## ⚙️ Props
| Prop        | 	Type	                              | Default      | 	Description                        |
|-------------|-------------------------------------|--------------|-------------------------------------|
| `url`	      | `string`	                           | (required)   | 	URL to preview                     |
| `theme`	    | `"card"`  \| `"inline"` \| `"none"` | 	`"card"`    | 	Layout style                       |
| `fetcher`   | 	`(url) => Promise\<MetaData\>`     | 	`fetchMeta` | 	Custom meta fetch logic            |                 
| `refresh`   | 	`number`	                          | `86400`      | 	Cache TTL in seconds               |  
| `fallback`	 | `React.ReactNode`	                  | `null`       | 	UI to render when error or timeout |                          
| `className` | 	`string`	                          | `""`	        | Extra Tailwind classes to pass in   |    

## 🧠 How It Works
* Fetches the given URL from server side using fetchMeta()

* Extracts og:title, og:image, description, favicon, etc.

* Renders as HTML-only, no client hydration needed

* Gracefully falls back when site is protected or missing meta tags

* You can override everything via fetcher + theme

## 🔧 Advanced Usage
Custom fetcher (with link-preview-js or headless browser)
```tsx

<LinkPreview
  url="https://leetcode.com"
  fetcher={myEdgeFetcher}
/>
```
