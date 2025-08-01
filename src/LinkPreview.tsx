import type { LinkPreviewProps, MetaData, DisplayConfig, StyleConfig, InteractionConfig, ErrorConfig } from "./types";
import { fetchMeta } from "./fetch-meta";
import { CardPreview, CardPreview2, InlinePreview, InlinePreviewWithDomain, InlinePreviewWithTooltip } from "./themes/tailwind";

const defaultDisplay: DisplayConfig = {
    showTitle: true,
    showDescription: true,
    showImage: true,
    showIcon: true,
    showDomain: true,
    showSiteName: false,
    maxTitleLength: 100,
    maxDescriptionLength: 150,
    imageHeight: "auto",
    imageWidth: "auto"
};

const defaultStyle: StyleConfig = {
    cardWidth: "max-w-3xl",
    cardHeight: "auto",
    borderRadius: "rounded-lg",
    shadow: "shadow-sm",
    hoverEffect: true,
    imageHeight: "auto",
    imageWidth: "auto",
    customStyles: {}
};

const defaultInteraction: InteractionConfig = {
    openInNewTab: true,
    disableLink: false
};

const defaultError: ErrorConfig = {
    showError: true,
    errorText: "Failed to load preview"
};

function truncateText(text: string, maxLength: number): string {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
}

function DefaultErrorComponent({ text, url }: { text: string; url: string }) {
    return (
        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
            <span className="text-sm text-red-600">{text}</span>
        </div>
    );
}

export async function LinkPreview(props: LinkPreviewProps) {
    const {
        url,
        fetcher = fetchMeta,
        theme = "card",
        fallback = null,
        className = "",
        display = {},
        style = {},
        interaction = {},
        error = {},
        cacheKey,
        cacheExpiry,
        timeout,
        userAgent,
        proxy
    } = props;

    const displayConfig = { ...defaultDisplay, ...display };
    const styleConfig = { ...defaultStyle, ...style };
    const interactionConfig = { ...defaultInteraction, ...interaction };
    const errorConfig = { ...defaultError, ...error };

    let meta: MetaData | undefined;
    let errorState: string | null = null;

    try {
        meta = await fetcher(url);
    } catch (err) {
        console.error("[LinkPreview] Fetch failed:", err);
        errorState = err instanceof Error ? err.message : "Unknown error";
    }

    if (errorState && errorConfig.showError) {
        return errorConfig.errorComponent || (
            <DefaultErrorComponent 
                text={errorConfig.errorText || "Failed to load preview"} 
                url={url}
            />
        );
    }

    if (!meta?.title) {
        return fallback ?? (
            <a 
                href={url}
                target={interactionConfig.openInNewTab ? "_blank" : "_self"}
                rel={interactionConfig.openInNewTab ? "noopener noreferrer" : ""}
                className={`text-blue-600 underline ${className}`}
                style={styleConfig.customStyles}
            >
                {url}
            </a>
        );
    }

    const processedMeta: MetaData = {
        ...meta,
        title: displayConfig.showTitle && meta.title 
            ? truncateText(meta.title, displayConfig.maxTitleLength || 100)
            : undefined,
        description: displayConfig.showDescription && meta.description
            ? truncateText(meta.description, displayConfig.maxDescriptionLength || 150)
            : undefined,
        image: displayConfig.showImage ? meta.image : undefined,
        icon: displayConfig.showIcon ? meta.icon : undefined,
        siteName: displayConfig.showSiteName ? meta.siteName : undefined
    };

    if (theme === "none") {
        return null;
    }

    const commonProps = {
        meta: processedMeta,
        className,
        styleConfig,
        interactionConfig
    };

    if (theme === "inline") {
        return <InlinePreview {...commonProps} />;
    }

    if (theme === "inline-domain") {
        return <InlinePreviewWithDomain {...commonProps} />;
    }

    if (theme === "inline-tooltip") {
        return <InlinePreviewWithTooltip {...commonProps} />;
    }

    if (theme === "card2") {
        return <CardPreview2 {...commonProps} />;
    }

    return <CardPreview {...commonProps} />;
}
