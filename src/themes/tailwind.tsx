import React from "react";
import type { MetaData } from "../types.ts";

export function InlinePreview(meta: MetaData, className = "") {
    return (
        <a
            href={meta.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline ${className}`}
        >
            {meta.icon && (
                <img
                    src={meta.icon}
                    referrerPolicy="no-referrer"
                    className="w-3.5 h-3.5 rounded-sm flex-shrink-0"
                    alt=""
                />
            )}
            <span className="font-medium">{meta.title || meta.url}</span>
        </a>
    );
}

export function CardPreview(meta: MetaData, className = "") {
    return (
        <a
            href={meta.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block max-w-3xl bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${className}`}
        >
            <div className="flex">
                {/* Left side - Text content */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                    {/* Top section - Icon and Title */}
                    <div className="flex items-start gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                            <h3 className="text-gray-900 text-sm line-clamp-2 leading-tight">
                                {meta.title || 'No title'}
                            </h3>
                        </div>
                    </div>
                    
                    {/* Middle section - Description */}
                    {meta.description && (
                        <div className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                            {meta.description}
                        </div>
                    )}
                    
                    {/* URL + icon */}
                    <div className="flex items-center text-xs text-zinc-500 gap-1 mt-auto">
                        {meta.icon && (
                            <img
                                src={meta.icon}
                                referrerPolicy="no-referrer"
                                className="w-3.5 h-3.5"
                                alt="favicon"
                            />
                        )}
                        <span className="truncate">{new URL(meta.url || '').hostname}</span>
                    </div>
                </div>
                
                {/* Right side - Image */}
                {meta.image && (
                    <div className="flex-shrink-0 max-w-48">
                        <img
                            src={meta.image}
                            alt={meta.title || 'Preview image'}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-r-lg"

                        />
                    </div>
                )}
            </div>
        </a>
    );
}

export function CardPreview2(meta: MetaData, className = "") {
    return (
        <a href={meta.url} target="_blank" rel="noopener noreferrer">
            <div className={`max-w-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition bg-white overflow-hidden ${className}`}>
                {/* image on top */}
                {meta.image && (
                    <img
                    src={meta.image}
                    alt={meta.title || 'preview'}
                    className="w-full h-40 object-cover"
                    referrerPolicy="no-referrer"
                    />
                )}

                {/* content below */}
                <div className="p-4 flex flex-col gap-2">
                    {/* title */}
                    <h3 className="text-base font-semibold text-zinc-800 line-clamp-2">
                    {meta.title || 'No title'}
                    </h3>

                    {/* description */}
                    {meta.description && (
                    <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3">
                        {meta.description}
                    </p>
                    )}

                    {/* site url + favicon */}
                    <div className="flex items-center text-xs text-zinc-500 gap-2 mt-2">
                    {meta.icon && (
                        <img
                        src={meta.icon}
                        className="w-4 h-4"
                        alt="favicon"
                        referrerPolicy="no-referrer"
                        />
                    )}
                    <span className="truncate">{new URL(meta.url || '').hostname}</span>
                    </div>
                </div>
            </div>
        </a>
    )
}

export function InlinePreviewWithDomain(meta: MetaData, className = "") {
    const hostname = new URL(meta.url || '').hostname;
    return (
        <a
            href={meta.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline ${className}`}
        >
            {meta.icon && (
                <img
                    src={meta.icon}
                    referrerPolicy="no-referrer"
                    className="w-3.5 h-3.5 rounded-sm flex-shrink-0"
                    alt=""
                />
            )}
            <span className="font-medium">{meta.title}</span>
            <span className="text-gray-500 text-xs">({hostname})</span>
        </a>
    );
}

export function InlinePreviewWithTooltip(meta: MetaData, className = "") {
    return (
        <span className="group relative inline-block">
            <a
                href={meta.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline ${className}`}
            >
                {meta.icon && (
                    <img
                        src={meta.icon}
                        referrerPolicy="no-referrer"
                        className="w-3.5 h-3.5 rounded-sm flex-shrink-0"
                        alt=""
                    />
                )}
                <span className="font-medium">{meta.title}</span>
            </a>
            
            {meta.description && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 max-w-sm">
                    <div className="line-clamp-3 leading-relaxed">
                        {meta.description}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
            )}
        </span>
    );
}