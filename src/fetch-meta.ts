import type { MetaData } from "./types";

function resolveUrl(baseUrl: string, relativeUrl: string): string {
    try {
        return new URL(relativeUrl, baseUrl).href;
    } catch {
        return relativeUrl;
    }
}

// RSC兼容的HTML实体解码函数
function decodeHtmlEntities(text: string): string {
    if (!text) return text;
    
    return text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/')
        .replace(/&#x60;/g, '`')
        .replace(/&#x3D;/g, '=')
        .replace(/&#x2B;/g, '+')
        .replace(/&#x23;/g, '#')
        .replace(/&#x24;/g, '$')
        .replace(/&#x25;/g, '%')
        .replace(/&#x26;/g, '&')
        .replace(/&#x28;/g, '(')
        .replace(/&#x29;/g, ')')
        .replace(/&#x2A;/g, '*')
        .replace(/&#x2C;/g, ',')
        .replace(/&#x2D;/g, '-')
        .replace(/&#x2E;/g, '.')
        .replace(/&#x3A;/g, ':')
        .replace(/&#x3B;/g, ';')
        .replace(/&#x3C;/g, '<')
        .replace(/&#x3E;/g, '>')
        .replace(/&#x3F;/g, '?')
        .replace(/&#x40;/g, '@')
        .replace(/&#x5B;/g, '[')
        .replace(/&#x5C;/g, '\\')
        .replace(/&#x5D;/g, ']')
        .replace(/&#x5E;/g, '^')
        .replace(/&#x5F;/g, '_')
        .replace(/&#x7B;/g, '{')
        .replace(/&#x7C;/g, '|')
        .replace(/&#x7D;/g, '}')
        .replace(/&#x7E;/g, '~');
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

    const $ = (re: RegExp) => {
        const match = html.match(re)?.[1]?.trim();
        return match ? decodeHtmlEntities(match) : undefined;
    };

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
    
    // Debug logging
    if (!meta.icon) {
        console.log(`[fetchMeta] No icon found for ${url}`);
    } else {
        console.log(`[fetchMeta] Icon found: ${meta.icon}`);
    }
    
    return meta;
}
