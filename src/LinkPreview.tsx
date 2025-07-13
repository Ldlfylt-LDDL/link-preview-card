import React from "react";
import type { LinkPreviewProps, MetaData } from "./types";
import { fetchMeta } from "./fetch-meta";

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

    // No rendering, if no title or url
    if (!meta?.title || !meta?.url) {
        return fallback;
    }

    // Basic UI
    return (
        <a
            href={meta.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block border rounded p-4 shadow hover:bg-gray-50 ${className}`}
        >
            <div className="font-semibold text-lg mb-1">{meta.title}</div>
            {meta.description && <div className="text-sm text-gray-600 line-clamp-2">{meta.description}</div>}
            {meta.image && (
                <img
                    src={meta.image}
                    alt={meta.title}
                    className="w-full h-auto mt-2 rounded"
                />
            )}
        </a>
    );
}
