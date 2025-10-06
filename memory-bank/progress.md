# Progress: Monochrome Flow

## Current Status

The Eleventy project is currently undergoing implementation of Change Request ZIRPO-02 (Homepage Cleanup and Interactive Lightbox Gallery). A critical issue has been identified where the `collections.portrait` data is not being populated, leading to an empty gallery on the homepage. Debugging is in progress.

## What Works

*   **Project Setup**: `package.json` is initialized, and core dependencies (Eleventy, Sharp, Luxon, @11ty/eleventy-img) are installed.
*   **Site Rebranding**: Site title and author information are updated across `src/_data/site.json`, `src/_includes/components/header.njk`, and `src/_includes/components/footer.njk`.
*   **Conditional Image Processing**: The `scripts/process-image.js` no longer forces grayscale. The `.eleventy.js` image shortcode now conditionally applies grayscale based on the `monochrome` front matter variable.
*   **New Shortcodes/Filters**: The `year` shortcode and `htmlDateString`, `readableDate` filters are added to `.eleventy.js`.
*   **Content Integration**: Markdown files in `src/portraits/` are processed by Eleventy, and their metadata is accessible in templates. `src/portraits/DSCF1503.md` now includes `monochrome: false` and renders in color.
*   **Eleventy Configuration**: `.eleventy.js` is configured for correct directory structure, asset passthrough, custom date filters, `year` shortcode, and the `portraits` collection.
*   **Core Templates**: All essential Nunjucks templates (`base.njk`, `portrait.njk`, `header.njk`, `footer.njk`, `gallery-grid.njk`, `index.njk`) and `site.json` are in place and functioning.
*   **Local Server**: The `npm start` command successfully runs the Eleventy development server, and the site renders correctly in the browser.

## What's Left to Build / Next Milestones

1.  **Fix Empty Gallery**: Resolve the issue with `collections.portrait` being empty.
2.  Verify lightbox functionality once the gallery is visible.
3.  Continue adding more portraits and their corresponding markdown files.
4.  Refine styling and add more advanced features as per project brief.
5.  **Deployment**: Prepare the project for continuous deployment to Netlify.

## Known Issues

*   **Critical**: `collections.portrait` is empty, causing the gallery to not render on the homepage.
*   Minor console error for `favicon.ico` (non-critical).

## Evolution of Project Decisions

*   The initial plan was refined to include an automated image processing step, which significantly streamlines the content addition workflow.
*   The implementation of custom date filters and the `year` shortcode was necessary to resolve Nunjucks rendering errors and enhance functionality.
*   Explicitly defining the `portraits` collection in `.eleventy.js` was crucial for the gallery grid to correctly display content.
*   The image processing pipeline was adjusted to allow for conditional grayscale, moving the grayscale logic from the initial `process-image.js` script to the Eleventy `image` shortcode.
