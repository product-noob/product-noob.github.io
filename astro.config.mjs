// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://princejain.me',
    output: 'static',
    build: {
        assets: 'assets',
        // Inline all stylesheets directly into <style> tags to eliminate
        // render-blocking CSS requests (est. 840ms savings on mobile).
        // CSS content is identical — only the delivery changes (embedded
        // in HTML vs separate file requests).
        inlineStylesheets: 'always'
    }
});
