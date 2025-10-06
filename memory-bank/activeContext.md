# Active Context: Monochrome Flow

## Current Work Focus

The current focus is on implementing site rebranding and selective monochrome image processing as per Change Request ZIRPO-01.

## Recent Changes

*   The `memory-bank` directory has been created and populated with initial project documentation.
*   `package.json` initialized and Eleventy and Sharp installed.
*   `scripts/process-image.js` created for image resizing and grayscale conversion, now updated to *not* force grayscale.
*   `src/portraits/DSCF1503.jpg` processed and `src/portraits/DSCF1503.md` created, with `monochrome: false` added to `DSCF1503.md`.
*   Core Eleventy template files (`src/_includes/layouts/base.njk`, `src/_includes/layouts/portrait.njk`, `src/_includes/components/header.njk`, `src/_includes/components/footer.njk`, `src/_includes/components/gallery-grid.njk`, `src/index.njk`) and `src/_data/site.json` created.
*   `src/_data/site.json` updated with "zirpography" title and "zirpo" author.
*   `src/_includes/components/header.njk` verified to use `{{ site.title }}`.
*   `src/_includes/components/footer.njk` updated to use `© {% year %} {{ site.author.name }}`.
*   `.eleventy.js` configured for passthrough copies, `luxon` date filter, `portraits` collection, and now includes `year` shortcode, `htmlDateString` and `readableDate` filters, and a modified `image` shortcode for conditional grayscale.
*   `src/_includes/layouts/portrait.njk` updated to pass the `monochrome` front matter variable to the `image` shortcode.
*   Image paths in templates corrected.

## Next Steps

1.  Continue adding more portraits and their corresponding markdown files.
2.  Refine styling and add more advanced features as per project brief.

## Active Decisions and Considerations

*   **Image Processing**: The decision to use `sharp` for image processing and create a dedicated script ensures automation and consistency. The script was modified to allow Eleventy's `image` shortcode to control grayscale conditionally.
*   **Eleventy Configuration**: Custom collections, filters, and shortcodes in `.eleventy.js` are crucial for Eleventy's dynamic content generation and new conditional image processing.
*   **Template Structure**: The modular Nunjucks template structure (base layout, portrait layout, components) promotes reusability and maintainability.

## Learnings and Project Insights

*   Eleventy's flexibility with custom filters and collections is powerful for content-driven sites.
*   Careful attention to file paths and Eleventy's build process is essential for correct asset and content rendering.
*   It's important to ensure that image processing steps (e.g., grayscale conversion) are handled consistently and at the correct stage (e.g., within Eleventy's image shortcode rather than an initial processing script) to allow for conditional behavior.
*   Dependencies like `@11ty/eleventy-img` must be explicitly installed.
