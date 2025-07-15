import type { MetaData } from "./types";

async function urlOk(src?: string): Promise<boolean> {
    if (!src) return false;
    try {
        const res = await fetch(src, { method: "HEAD" });
        return res.ok && typeof res.headers.get("content-type") === "string" && res.headers.get("content-type")!.startsWith("image/");
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
        $(/<link[^>]+rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i) ||
        $(/<link[^>]+rel=["']shortcut icon["'][^>]*href=["']([^"']+)["']/i);

    let icon =
        $(/<link[^>]+rel=["']icon["'][^>]*href=["']([^"']+)["']/i) ||
        $(/<link[^>]+rel=["']shortcut icon["'][^>]*href=["']([^"']+)["']/i);

    /* ---------- validate URLs ---------- */
    if (!(await urlOk(img)))  img  = undefined;
    if (!(await urlOk(icon))) icon = undefined;

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
