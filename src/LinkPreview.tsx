import type { LinkPreviewProps, MetaData } from "./types";
import { fetchMeta } from "./fetch-meta";
import { CardPreview, CardPreview2, InlinePreview, InlinePreviewWithDomain, InlinePreviewWithTooltip } from "./themes/tailwind";

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
        return fallback ?? (
            <a href={url}
               target="_blank"
               rel="noopener noreferrer"
               className={`text-blue-600 underline ${className}`}>
                {url}
            </a>
        );
    }

    if (!meta?.title) {
        return fallback;
    }

    if (theme === "none") {
        return null;
    }

    if (theme === "inline") {
        return InlinePreview(meta, className);
    }

    if (theme === "inline-domain") {
        return InlinePreviewWithDomain(meta, className);
    }

    if (theme === "inline-tooltip") {
        return InlinePreviewWithTooltip(meta, className);
    }

    if (theme === "card2") {
        return CardPreview2(meta, className);
    }

    // Default: theme === "card"
    return CardPreview(meta, className);
}
