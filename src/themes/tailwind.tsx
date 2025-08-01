import React from "react";
import type { MetaData } from "../types.ts";

export function CardOldPreview(meta: MetaData, className = "") {
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
                    referrerPolicy="no-referrer"
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
                <img
                    src={meta.icon}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-sm"
                    alt="favicon"
                />
            )}
            <span>{meta.title}</span>
            {meta.description && <span className="text-gray-500">— {meta.description}</span>}
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
                        {meta.icon && (
                            <img
                                src={meta.icon}
                                referrerPolicy="no-referrer"
                                className="w-4 h-4 rounded-sm flex-shrink-0"
                                alt="favicon"
                            />
                        )}
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 leading-tight">
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
                    
                    {/* Bottom section - URL */}
                    <div className="flex items-center text-xs text-gray-500">
                        <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5a2 2 0 012.828 0z" clipRule="evenodd" />
                        </svg>
                        <span className="truncate">
                            {new URL(meta.url || '').hostname}
                        </span>
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