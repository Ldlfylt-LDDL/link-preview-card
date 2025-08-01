import { describe, it, expect, vi } from "vitest";
import { fetchMeta } from "../src/fetch-meta";

global.DOMParser = class {
    parseFromString(html: string) {
        const parser = require("node-html-parser").parse;
        return parser(html);
    }
} as any;

const sampleHTML = `
<html lang="en">
  <head>
    <title>Sample Title</title>
    <meta name="description" content="This is a description." />
    <meta property="og:image" content="https://example.com/image.png" />
    <meta property="og:site_name" content="Example Site" />
    <link rel="icon" href="/favicon.ico" />
  </head>
</html>
`;

describe("fetchMeta", () => {
    it("should extract metadata correctly", async () => {
        // mock fetch
        global.fetch = vi.fn().mockResolvedValue({
            text: () => Promise.resolve(sampleHTML),
        }) as any;

        const url = "https://example.com";
        const result = await fetchMeta(url);

        expect(result).toEqual({
            title: "Sample Title",
            description: "This is a description.",
            image: undefined,
            icon: "https://example.com/favicon.ico",
            siteName: "Example Site",
            url: "https://example.com",
        });
    });
});
