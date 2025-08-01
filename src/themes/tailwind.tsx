import React from "react";
import type { MetaData, StyleConfig, InteractionConfig } from "../types.ts";

interface ThemeComponentProps {
    meta: MetaData;
    className?: string;
    styleConfig?: StyleConfig;
    interactionConfig?: InteractionConfig;
}

export function InlinePreview({ 
    meta, 
    className = "", 
    interactionConfig = {}
}: ThemeComponentProps) {
    return (
        <a
            href={meta.url}
            target={interactionConfig.openInNewTab ? "_blank" : "_self"}
            rel={interactionConfig.openInNewTab ? "noopener noreferrer" : ""}
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

export function CardPreview({ 
    meta, 
    className = "", 
    styleConfig = {},
    interactionConfig = {}
}: ThemeComponentProps) {
    const cardClasses = [
        "block bg-white border border-gray-200 transition-shadow",
        styleConfig.cardWidth || "max-w-3xl",
        styleConfig.borderRadius || "rounded-lg",
        styleConfig.shadow || "shadow-sm",
        styleConfig.hoverEffect ? "hover:shadow-md" : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <a
            href={meta.url}
            target={interactionConfig.openInNewTab ? "_blank" : "_self"}
            rel={interactionConfig.openInNewTab ? "noopener noreferrer" : ""}
            className={cardClasses}
            style={styleConfig.customStyles}
        >
            <div className="flex">
                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div className="flex items-start gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                            <h3 className="text-gray-900 text-sm line-clamp-2 leading-tight">
                                {meta.title || 'No title'}
                            </h3>
                        </div>
                    </div>
                    
                    {meta.description && (
                        <div className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                            {meta.description}
                        </div>
                    )}
                    
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

export function CardPreview2({ 
    meta, 
    className = "", 
    styleConfig = {},
    interactionConfig = {}
}: ThemeComponentProps) {
    const cardClasses = [
        "max-w-sm border border-gray-200 shadow-sm transition bg-white overflow-hidden",
        styleConfig.borderRadius || "rounded-xl",
        styleConfig.shadow || "shadow-sm",
        styleConfig.hoverEffect ? "hover:shadow-lg" : "",
        className
    ].filter(Boolean).join(" ");

    return (
        <a 
            href={meta.url} 
            target={interactionConfig.openInNewTab ? "_blank" : "_self"}
            rel={interactionConfig.openInNewTab ? "noopener noreferrer" : ""}
            className={cardClasses}
            style={styleConfig.customStyles}
        >
            <div className={styleConfig.cardWidth || "max-w-sm"}>
                {meta.image && (
                    <img
                        src={meta.image}
                        alt={meta.title || 'preview'}
                        className="w-full h-40 object-cover"
                        referrerPolicy="no-referrer"
                        style={{
                            height: styleConfig.imageHeight || "10rem",
                            width: styleConfig.imageWidth || "100%"
                        }}
                    />
                )}

                <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-base font-semibold text-zinc-800 line-clamp-2">
                        {meta.title || 'No title'}
                    </h3>

                    {meta.description && (
                        <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3">
                            {meta.description}
                        </p>
                    )}

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
    );
}

export function InlinePreviewWithDomain({ 
    meta, 
    className = "", 
    interactionConfig = {}
}: ThemeComponentProps) {
    const hostname = new URL(meta.url || '').hostname;

    return (
        <a
            href={meta.url}
            target={interactionConfig.openInNewTab ? "_blank" : "_self"}
            rel={interactionConfig.openInNewTab ? "noopener noreferrer" : ""}
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

export function InlinePreviewWithTooltip({ 
    meta, 
    className = "", 
    interactionConfig = {}
}: ThemeComponentProps) {
    return (
        <span className="group relative inline-block">
            <a
                href={meta.url}
                target={interactionConfig.openInNewTab ? "_blank" : "_self"}
                rel={interactionConfig.openInNewTab ? "noopener noreferrer" : ""}
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