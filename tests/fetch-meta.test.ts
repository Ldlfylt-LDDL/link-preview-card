import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchMeta } from "../src/fetch-meta";

const fakeHTML = `
  <html lang="en">
    <head>
      <title>Test Title</title>
      <meta property="og:title" content="OG Title Here" />
      <meta name="description" content="A test description." />
      <meta property="og:image" content="https://img.com/pic.jpg" />
      <meta property="og:site_name" content="Test Site" />
      <meta property="og:url" content="https://example.com/test" />
      <link rel="icon" href="/favicon.ico" />
    </head>
  </html>
`;

describe("fetchMeta", () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn().mockResolvedValue({
            text: async () => fakeHTML,
        }) as any;
    });

    it("should extract OG and meta data from HTML", async () => {
        const meta = await fetchMeta("https://example.com");

        expect(meta).toEqual({
            title: "OG Title Here",
            description: "A test description.",
            image: "https://img.com/pic.jpg",
            siteName: "Test Site",
            url: "https://example.com/test",
            icon: "/favicon.ico",
        });
    });
});
