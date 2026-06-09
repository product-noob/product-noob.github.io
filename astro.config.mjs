// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://princejain.me',
    output: 'static',
    build: {
        assets: 'assets',
        // 'auto' lets Astro inline only stylesheets below ~4KB and link
        // larger ones. Trades a tiny FCP delay for cross-page caching of
        // the shared bundle — net win over 'always' once the visitor
        // navigates beyond the landing page.
        inlineStylesheets: 'auto'
    }
});
