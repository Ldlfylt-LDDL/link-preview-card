export interface MetaData {
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    url?: string;
    icon?: string;
}

export interface DisplayConfig {
    showTitle?: boolean;
    showDescription?: boolean;
    showImage?: boolean;
    showIcon?: boolean;
    showDomain?: boolean;
    showSiteName?: boolean;
    maxTitleLength?: number;
    maxDescriptionLength?: number;
    imageHeight?: string;
    imageWidth?: string;
}

export interface StyleConfig {
    cardWidth?: string;
    cardHeight?: string;
    borderRadius?: string;
    shadow?: string;
    hoverEffect?: boolean;
    imageHeight?: string;
    imageWidth?: string;
    customStyles?: React.CSSProperties;
}

export interface InteractionConfig {
    openInNewTab?: boolean;
    disableLink?: boolean;
}

export interface ErrorConfig {
    showError?: boolean;
    errorComponent?: React.ReactNode;
    errorText?: string;
}

export interface LinkPreviewProps {
    url: string;
    theme?: "card" | "card2" | "inline" | "inline-domain" | "inline-tooltip" | "none";
    fetcher?: (url: string) => Promise<MetaData>;
    refresh?: number;
    fallback?: React.ReactNode;
    className?: string;
    
    display?: DisplayConfig;
    style?: StyleConfig;
    interaction?: InteractionConfig;
    error?: ErrorConfig;
    
    cacheKey?: string;
    cacheExpiry?: number;
    timeout?: number;
    userAgent?: string;
    proxy?: string;
}
