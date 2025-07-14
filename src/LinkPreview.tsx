import type { LinkPreviewProps, MetaData } from "./types";
import { fetchMeta } from "./fetch-meta";
import { CardPreview, InlinePreview } from "./themes/tailwind";

export async function LinkPreview(props: LinkPreviewProps) {
    const {
        url,
        fetcher = fetchMeta,
        theme = "card",
        fallback = null,
        className = "",
    } = props;

    let meta: MetaData | undefined;

    try {
        meta = await fetcher(url);
    } catch (err) {
        console.error("[LinkPreview] Fetch failed:", err);
        return fallback;
    }

    if (!meta?.title || !meta?.url) {
        return fallback;
    }

    if (theme === "none") {
        return null;
    }

    if (theme === "inline") {
        return InlinePreview(meta, className);
    }

    // Default: theme === "card"
    return CardPreview(meta, className);
}
