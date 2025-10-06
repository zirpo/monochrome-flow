# Technical Context: Monochrome Flow

## Technologies Used

*   **Static Site Generator**: Eleventy (11ty)
*   **Templating Language**: Nunjucks
*   **Content Format**: Markdown with YAML Front Matter
*   **Styling**: CSS
*   **Scripting**: JavaScript (for `gallery.js`)
*   **Package Management**: npm (Node Package Manager)
*   **Version Control**: Git
*   **Deployment**: Netlify

## Development Setup

1.  **Node.js**: Required to run Eleventy and npm.
2.  **npm**: Used to install project dependencies (e.g., Eleventy itself).
3.  **Git**: For cloning the repository and managing version control.

## Technical Constraints

*   **Static Output**: The project generates static HTML, CSS, and JavaScript files. Dynamic server-side logic is not supported directly within the Eleventy build.
*   **Markdown for Content**: Portrait content and metadata must adhere to the Markdown with YAML front matter format for Eleventy to process it correctly.
*   **Image Format**: Images are expected to be JPG. Grayscale conversion is now conditional, controlled by front matter. Recommended size is 2400px on the long edge.

## Dependencies

The primary dependency is Eleventy, managed via `package.json`. Other dependencies would typically be development tools or plugins for Eleventy.

## Tool Usage Patterns

*   **`npm install`**: To set up the project by installing all required Node.js packages.
*   **`npm run dev`**: To start a local development server with live reloading, facilitating rapid development and previewing changes.
*   **`npm run build`**: To compile the static site for deployment, generating the `_site` directory.
*   **Git Commands**: Standard `git clone`, `git add`, `git commit`, `git push` for version control and deployment triggering.
