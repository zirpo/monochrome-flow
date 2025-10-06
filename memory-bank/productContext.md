# Product Context: Monochrome Flow

## Problem Solved

The primary problem Monochrome Flow solves is the complexity and time commitment often associated with maintaining an online photography portfolio. Traditional methods can involve manual HTML editing, complex content management systems, or proprietary platforms with limited customization. This project aims to streamline the content update process, allowing photographers to focus on their art rather than web development.

## How it Should Work

The ideal user experience for a photographer adding new content is as follows:

1.  **Image Placement**: The photographer places a new monochrome JPG image into the `src/portraits/` directory.
2.  **Metadata Creation**: A corresponding markdown file (e.g., `image-name.md`) is created in the same directory, containing essential metadata in its front matter (title, date, mood, camera, etc.).
3.  **Automatic Integration**: Upon saving these files and pushing to the repository (if deployed via Netlify), the Eleventy build process automatically generates a new individual portrait page and updates the main gallery page. No manual linking or page creation is required.

## User Experience Goals

*   **Simplicity**: The process of adding and managing content should be intuitive and require minimal technical knowledge.
*   **Elegance**: The website design should be clean, uncluttered, and visually appealing, allowing the photography to be the primary focus.
*   **Performance**: The static nature of the site should ensure fast loading times and a smooth browsing experience.
*   **Maintainability**: The codebase should be easy to understand and extend for future customizations.
*   **Automation**: Reduce manual steps for content updates and deployment.
