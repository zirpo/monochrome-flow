# **Change Request: ZIRPO-01**

**Title:** Implement Site Rebranding and Selective Monochrome Image Processing  
**Author:** Gemini (Lead Developer)  
**Date:** 2025-10-06  
**Status:** Proposed

### **1\. Introduction & Rationale**

#### **1.1. Current Situation**

The project, currently hosted in the monochrome-flow repository, functions as a black and white photography portfolio. The site's branding (title, author name) is derived from the repository's name. A build script automatically processes all source images, converting them to grayscale before publishing.

#### **1.2. Problem Statement**

There are two primary issues with the current implementation:

1. **Branding Mismatch:** The site's public-facing name and author information do not reflect the desired brand identity of "zirpography" by the artist "zirpo".  
2. **Inflexible Image Processing:** The image processing pipeline enforces a mandatory grayscale conversion on all images. This prevents the artist from displaying select photographs in their original color, limiting the site's artistic scope.

#### **1.3. Proposed Solution**

This change request outlines a two-part solution to address these issues:

1. **Site Rebranding:** A comprehensive update across all relevant configuration and template files will be performed to change the site's name to "zirpography" and update the author information to "zirpo".  
2. **Conditional Monochrome Processing:** The image processing logic will be enhanced to allow for selective grayscale conversion. This will be controlled by a new front matter variable in each portrait's Markdown file (e.g., monochrome: false). When this variable is set to false, the image will retain its original colors. If the variable is absent or set to true, the image will be converted to black and white, maintaining the existing behavior as the default.

### **2\. Implementation Steps**

This section provides detailed instructions and code snippets for the implementing developer.

#### **Task 1: Update Site Branding**

##### **Step 1.1: Modify Site Data**

Update the core site information to reflect the new brand.  
**File to Edit:** src/\_data/site.json  
\- {  
\-   "title": "monochrome flow",  
\-   "url": "\[https://zirpography.netlify.app/\](https://zirpography.netlify.app/)",  
\-   "author": {  
\-     "name": "monochrome flow",  
\-     "email": ""  
\-   }  
\- }  
\+ {  
\+   "title": "zirpography",  
\+   "url": "\[https://zirpography.netlify.app/\](https://zirpography.netlify.app/)",  
\+   "author": {  
\+     "name": "zirpo",  
\+     "email": ""  
\+   }  
\+ }

##### **Step 1.2: Update Header Branding**

Ensure the main site header links to the homepage with the correct brand name.  
**File to Edit:** src/\_includes/components/header.njk  
\- \<a href="/" class="font-bold text-2xl"\>monochrome flow\</a\>  
\+ \<a href="/" class="font-bold text-2xl"\>{{ site.title }}\</a\>

##### **Step 1.3: Update Footer Copyright**

Update the copyright notice in the site footer to credit the correct author.  
**File to Edit:** src/\_includes/components/footer.njk  
\- \<p class="text-sm text-center"\>Copyright 2023 monochrome flow\</p\>  
\+ \<p class="text-sm text-center"\>© {% year %} {{ site.author.name }}\</p\>

*(Note: I've also added a shortcode {% year %} for the current year to keep it updated automatically. This will be configured in .eleventy.js in the next task).*

#### **Task 2: Implement Selective Monochrome Image Processing**

##### **Step 2.1: Update Eleventy Configuration for Image Shortcode**

Modify the image shortcode to accept a new parameter that controls the grayscale effect. We will also add the year shortcode for the footer.  
**File to Edit:** .eleventy.js  
  const { DateTime } \= require("luxon");  
  const Image \= require("@11ty/eleventy-img");

  module.exports \= function (eleventyConfig) {  
    eleventyConfig.addPassthroughCopy("./src/assets/css/style.css");

\+   // Add a shortcode for the current year  
\+   eleventyConfig.addShortcode("year", () \=\> \`${new Date().getFullYear()}\`);  
\+  
    // Returns a BEM class name, e.g. "c-gallery\_\_image"  
    eleventyConfig.addShortcode("bem", function (block, element, modifier) {  
      // ... (no changes in this shortcode)  
    });

\-   eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes) {  
\+   eleventyConfig.addNunjucksAsyncShortcode("image", async function(src, alt, sizes, monochrome) {  
\+     // Default to monochrome if not explicitly set to false  
\+     const applyGrayscale \= monochrome \!== false;  
\+  
      // ... (no changes to \`let\` metadata block above)

      let metadata \= await Image(src, {  
        widths: \[300, 600, 900, 1200\],  
        formats: \["jpeg"\],  
        urlPath: "/portraits/",  
        outputDir: "./\_site/portraits/",  
        sharpJpegOptions: {  
          quality: 80,  
\-         grayscale: true,  
\+         grayscale: applyGrayscale,  
          progressive: true  
        }  
      });

      // ... (no changes to the rest of the function)  
    });

    return {  
      // ... (no changes to return object)  
    };  
  };

##### **Step 2.2: Update Portrait Layout Template**

Modify the portrait template to pass the monochrome front matter variable to the updated image shortcode.  
**File to Edit:** src/\_includes/layouts/portrait.njk  
\---  
layout: layouts/base.njk  
\---

\<div class="space-y-8"\>  
  \<div class="space-y-2"\>  
    \<h1 class="text-3xl font-bold"\>{{ title }}\</h1\>  
    \<time datetime="{{ date | htmlDateString }}"\>{{ date | readableDate }}\</time\>  
  \</div\>  
\- {% image src, alt, "(min-width: 30em) 50vw, 100vw" %}  
\+ {\# The \`or true\` provides a default if \`monochrome\` is not in front matter \#}  
\+ {% image src, alt, "(min-width: 30em) 50vw, 100vw", monochrome %}  
\</div\>

##### **Step 2.3: Add Front Matter to an Image for Testing**

To test, we will designate one of the existing images to be displayed in color. We will use DSCF1503.md as our test case.  
**File to Edit:** src/portraits/DSCF1503.md  
\---  
title: DSCF1503  
date: 2023-03-22  
src: ./src/portraits/DSCF1503.jpg  
alt: DSCF1503  
\+monochrome: false  
\---

*(Developer Note: You can set monochrome: true for any images you wish to remain black and white, or simply omit the line, as black and white is the default.)*

### **3\. Testing & Verification Plan**

1. **Start the Development Server:**  
   * In your terminal, run the command npx @11ty/eleventy \--serve.  
   * Open your browser to the local address provided (usually http://localhost:8080).  
2. **Verify Branding Changes:**  
   * **Header:** Confirm the site title in the header now reads "zirpography".  
   * **Footer:** Confirm the copyright notice reads "© 2025 zirpo" (the year will be current).  
   * **Page Title:** Check the browser tab title. It should display "zirpography" on the home page.  
3. **Verify Image Processing Logic:**  
   * **Color Image:** Navigate to the page for the DSCF1503 portrait. The image must now appear in full color.  
   * **B\&W Images (Control):** If other portraits exist, navigate to them to ensure they still appear in black and white. If not, create a new portrait markdown file without the monochrome: false line and confirm it renders in grayscale.  
   * **Build Output:** Stop the server and run npx @11ty/eleventy. Check the \_site/portraits/ directory. You will see multiple hashed versions of the images. Open the generated JPEG files for DSCF1503 and confirm they are in color.

### **4\. Acceptance Criteria (Definition of Done)**

* \[ \] All instances of "monochrome flow" in the user-facing site content have been replaced with "zirpography" or "zirpo" as appropriate.  
* \[ \] The image shortcode in .eleventy.js is successfully modified to conditionally apply the grayscale effect based on a new monochrome parameter.  
* \[ \] The portrait.njk layout correctly passes the monochrome variable from a page's front matter to the image shortcode.  
* \[ \] A portrait with monochrome: false in its front matter renders as a color image on the website.  
* \[ \] Portraits without a monochrome key in their front matter continue to render in black and white, ensuring no regressions in existing functionality.

### **5\. Potential Risks & Mitigation**

* **Risk:** Minor template errors if Nunjucks syntax is copied incorrectly.  
* **Mitigation:** The implementation steps provide exact code snippets. The developer should utilize these snippets carefully. The default behavior of the image shortcode ensures that if the new parameter is not passed correctly, existing images will still render as expected (in monochrome).

### **6\. Rollback Plan**

* In case of unforeseen issues, all changes can be reverted by using Git to discard changes to the modified files.  
* **Command:** git checkout \-- .eleventy.js src/\_data/site.json src/\_includes/components/header.njk src/\_includes/components/footer.njk src/\_includes/layouts/portrait.njk src/portraits/DSCF1503.md