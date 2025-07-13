import React from "react";

export const LinkPreview = ({ url }: { url: string }) => {
    return <a href={url} target="_blank">{url}</a>;
};