export interface MetaData {
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    url?: string;
    icon?: string;
}

export async function fetchMeta(url: string): Promise<MetaData> {
    const res = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (compatible; link-preview-card)",
        },
    });

    const html = await res.text();

    const extract = (regex: RegExp) =>
        html.match(regex)?.[1]?.trim() || undefined;

    return {
        title: extract(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"]+)["']/i) ||
            extract(/<title>([^<]+)<\/title>/i),
        description: extract(/<meta[^>]*name=["']description["'][^>]*content=["']([^"]+)["']/i),
        image: extract(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"]+)["']/i),
        siteName: extract(/<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"]+)["']/i),
        url: extract(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"]+)["']/i),
        icon: extract(/<link[^>]*rel=["']icon["'][^>]*href=["']([^"]+)["']/i),
    };
}
