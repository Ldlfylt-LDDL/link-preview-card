import React from "react";
import type { MetaData } from "../fetch-meta";

export function CardPreview(meta: MetaData, className = "") {
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

export function InlinePreview(meta: MetaData, className = "") {
    return (
        <a
            href={meta.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm text-blue-600 hover:underline ${className}`}
        >
            {meta.icon && (
                <img src={meta.icon} className="w-4 h-4 rounded-sm" alt="favicon" />
            )}
            <span>{meta.title}</span>
            {meta.description && <span className="text-gray-500">— {meta.description}</span>}
        </a>
    );
}
