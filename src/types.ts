export interface MetaData {
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
    url?: string;
    icon?: string;
}

export interface LinkPreviewProps {
    url: string;
    theme?: "card" | "inline" | "none";
    fetcher?: (url: string) => Promise<MetaData>;
    refresh?: number;
    fallback?: React.ReactNode;
    className?: string;
}
