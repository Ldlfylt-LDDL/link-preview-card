export interface MetaData {
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    url?: string;
    icon?: string;
}
import { parse } from 'node-html-parser';

const isChallenge = (html: string) =>
    /<title>\s*Just a moment/i.test(html) ||
    (html.includes('cf_chl_opt') && html.includes('/challenge-platform/'));


export async function fetchMeta(url: string): Promise<MetaData> {
    const html = await (await fetch(url)).text();
    console.log(html);
    if (isChallenge(html)) {
        throw new Error('Cloudflare challenge detected. ' + url + ' is blocked by Cloudflare Challenge. Only rendering basic url.');
    }

    const root = parse(html);
    const pick = (sel: string) => {
        const el = root.querySelector(sel);
        return el?.getAttribute("content")?.trim() ?? el?.getAttribute("href")?.trim();
    };

    return {
        title:
            pick('meta[property="og:title"]') ??
            pick('meta[name="twitter:title"]') ??
            root.querySelector("title")?.text.trim(),

        description:
            pick('meta[name="description"]') ??
            pick('meta[name="twitter:description"]'),

        image:
            pick('meta[property="og:image"]') ??
            pick('meta[name="twitter:image"]'),

        siteName: pick('meta[property="og:site_name"]'),

        url: pick('meta[property="og:url"]') ?? url,

        icon:
            pick('link[rel~="icon"]') ??
            pick('link[rel="apple-touch-icon"]'),
    };
}
