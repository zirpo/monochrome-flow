# Progress: Monochrome Flow

## Current Status

The Eleventy project has been successfully updated to implement site rebranding and selective monochrome image processing as per Change Request ZIRPO-01. All changes have been verified.

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

1.  Continue adding more portraits and their corresponding markdown files.
2.  Refine styling and add more advanced features as per project brief.
3.  **Deployment**: Prepare the project for continuous deployment to Netlify.

## Known Issues

*   Minor console error for `favicon.ico` (non-critical).

## Evolution of Project Decisions

*   The initial plan was refined to include an automated image processing step, which significantly streamlines the content addition workflow.
*   The implementation of custom date filters and the `year` shortcode was necessary to resolve Nunjucks rendering errors and enhance functionality.
*   Explicitly defining the `portraits` collection in `.eleventy.js` was crucial for the gallery grid to correctly display content.
*   The image processing pipeline was adjusted to allow for conditional grayscale, moving the grayscale logic from the initial `process-image.js` script to the Eleventy `image` shortcode.
