# Active Context: Monochrome Flow

## Current Work Focus

The current focus is on setting up the Eleventy development environment, implementing image processing, and integrating the first portrait.

## Recent Changes

*   The `memory-bank` directory has been created and populated with initial project documentation.
*   `package.json` initialized and Eleventy and Sharp installed.
*   `scripts/process-image.js` created for image resizing and grayscale conversion.
*   `src/portraits/DSCF1503.jpg` processed and `src/portraits/DSCF1503.md` created.
*   Core Eleventy template files (`src/_includes/layouts/base.njk`, `src/_includes/layouts/portrait.njk`, `src/_includes/components/header.njk`, `src/_includes/components/footer.njk`, `src/_includes/components/gallery-grid.njk`, `src/index.njk`) and `src/_data/site.json` created.
*   `.eleventy.js` configured for passthrough copies, `luxon` date filter, and `portraits` collection.
*   Image paths in templates corrected.

## Next Steps

1.  Continue adding more portraits and their corresponding markdown files.
2.  Refine styling and add more advanced features as per project brief.

## Active Decisions and Considerations

*   **Image Processing**: The decision to use `sharp` for image processing and create a dedicated script ensures automation and consistency.
*   **Eleventy Configuration**: Custom collections and filters in `.eleventy.js` are crucial for Eleventy's dynamic content generation.
*   **Template Structure**: The modular Nunjucks template structure (base layout, portrait layout, components) promotes reusability and maintainability.

## Learnings and Project Insights

*   Eleventy's flexibility with custom filters and collections is powerful for content-driven sites.
*   Careful attention to file paths and Eleventy's build process is essential for correct asset and content rendering.
