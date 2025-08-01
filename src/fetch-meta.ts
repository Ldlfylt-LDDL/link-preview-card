import type { MetaData } from "./types";

function resolveUrl(baseUrl: string, relativeUrl: string): string {
    try {
        return new URL(relativeUrl, baseUrl).href;
    } catch {
        return relativeUrl;
    }
}

async function urlOk(src?: string): Promise<boolean> {
    if (!src) return false;
    try {
        const res = await fetch(src, { 
            method: "HEAD",
            headers: { 
                "User-Agent": "Mozilla/5.0 (compatible; link-preview-card)" 
            }
        });
        return res.ok;
    } catch {
        return false;
    }
}

export async function fetchMeta(url: string): Promise<MetaData> {
    /* ---------- fetch HTML ---------- */
    const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; link-preview-card)" },
    });
    const html = await res.text();

    /* ---------- anti-bot quick exit ---------- */
    if (html.includes("Just a moment") && html.includes("cf_chl_opt")) {
        throw new Error("Cloudflare challenge detected");
    }

    const $ = (re: RegExp) => html.match(re)?.[1]?.trim();

    /* ---------- extract candidates ---------- */
    let img =
        $(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
        $(/<meta[^>]+name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i) ||
        $(/<meta[^>]+property=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);

    let icon =
        $(/<link[^>]*rel=["']icon["'][^>]*href=["']([^"']+)["'][^>]*>/i) ||
        $(/<link[^>]*rel=["']shortcut icon["'][^>]*href=["']([^"']+)["'][^>]*>/i) ||
        $(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']icon["'][^>]*>/i) ||
        $(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']shortcut icon["'][^>]*>/i) ||
        $(/<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["'][^>]*>/i) ||
        $(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']apple-touch-icon["'][^>]*>/i);

    /* ---------- resolve relative URLs ---------- */
    if (img && img.trim() && !img.startsWith('http')) {
        img = resolveUrl(url, img);
    }
    if (icon && icon.trim() && !icon.startsWith('http')) {
        icon = resolveUrl(url, icon);
    }

    /* ---------- validate URLs ---------- */
    if (!(await urlOk(img)))  img  = undefined;
    if (!(await urlOk(icon))) {
        // Try common favicon paths as fallback
        const commonFaviconPaths = [
            '/favicon.ico',
            '/favicon.png',
            '/favicon.jpg',
            '/favicon.svg',
            '/icon.png',
            '/icon.svg'
        ];
        
        for (const path of commonFaviconPaths) {
            const fallbackIcon = resolveUrl(url, path);
            if (await urlOk(fallbackIcon)) {
                icon = fallbackIcon;
                break;
            }
        }
        
        if (!icon) {
            icon = undefined;
        }
    }

    /* ---------- assemble MetaData ---------- */
    const meta: MetaData = {
        title:
            $(/<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']+)["']/i) ||
            $(/<meta[^>]+name=["']title["'][^>]*content=["']([^"']+)["']/i) ||
            $(/<title>\s*([\s\S]*?)<\/title>/i),

        description:
            $(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
            $(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["']/i),

        image:    img,
        icon:     icon,

        siteName:
            $(/<meta[^>]+property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i),

        url:
            $(/<meta[^>]+property=["']og:url["'][^>]*content=["']([^"']+)["']/i) ||
            $(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
            url
    };
    console.log(meta)
    return meta;
}
