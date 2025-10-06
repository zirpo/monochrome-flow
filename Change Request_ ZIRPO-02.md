# **Change Request: ZIRPO-02**

Title: Implement Homepage Cleanup and Interactive Lightbox Gallery  
Author: Gemini (Lead Developer)  
Date: 2025-10-06  
Status: Proposed

### **1\. Introduction & Rationale**

#### **1.1. Current Situation**

Following the successful rebranding in **ZIRPO-01**, the homepage (index.njk) currently displays a welcome message above the image grid. Each image in the grid links to a separate, individual page where a larger version of the image is displayed along with a generic placeholder description.

#### **1.2. Problem Statement**

1. **Redundant Content:** The "Welcome to..." message on the homepage is superfluous and detracts from the immediate visual impact of the photo gallery.  
2. **Poor User Experience:** The current navigation flow is disjointed. Clicking an image forces a full page reload to view a larger version. The user must then use the browser's back button to return to the gallery, making it cumbersome to browse multiple images. Furthermore, the content on these individual pages is static and not descriptive of the specific image.

#### **1.3. Proposed Solution**

This change request outlines a two-part solution to enhance the user experience:

1. **Homepage Cleanup:** The static welcome text will be removed from the homepage template, allowing the gallery grid to be the primary focus.  
2. **Lightbox Gallery Implementation:** A JavaScript-powered lightbox/modal will be implemented. When a user clicks a thumbnail, the full-resolution image will appear in an overlay on the current page. This lightbox will include:  
   * Next and Previous controls to allow seamless browsing of the entire gallery.  
   * A close button to exit the lightbox view.  
   * The title of the image displayed as a caption.  
   * Keyboard navigation (arrow keys for next/previous, Escape key to close).

This approach will create a modern, fluid, and professional browsing experience consistent with high-quality photography portfolios.

### **2\. Implementation Steps**

This section provides detailed instructions and code snippets for the implementing developer.

#### **Task 1: Remove Welcome Text from Homepage**

##### **Step 1.1: Edit the Index Template**

Remove the introductory div containing the headline and paragraph.  
**File to Edit:** src/index.njk  
\---  
layout: layouts/base.njk  
\---

\- \<div class="space-y-4"\>  
\-  \<h1 class="text-4xl font-bold"\>Welcome to {{ site.title }}\</h1\>  
\-  \<p class="text-lg"\>A reflective moment captured in monochrome.\</p\>  
\- \</div\>  
\-  
{% gallery\_grid collections.portrait %}

*(Developer Note: After this change, only the {% gallery\_grid %} shortcode should remain in this file, apart from the front matter.)*

#### **Task 2: Implement Lightbox Gallery**

##### **Step 2.1: Add Lightbox HTML Structure**

Add the HTML for the modal to the base layout so it is available on any page with a gallery. It will be hidden by default via CSS.  
**File to Edit:** src/\_includes/layouts/base.njk  
*Add the following code block just before the closing \</body\> tag:*  
    {\# Lightbox Modal Structure \- Add at the end of the body \#}  
    \<div id="lightbox" class="fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"\>  
      \<div class="relative max-w-5xl max-h-\[90vh\] w-full p-4"\>  
        \<button id="lightbox-close" class="absolute \-top-2 \-right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black hover:bg-gray-200"\>×\</button\>  
        \<img id="lightbox-image" src="" alt="" class="mx-auto h-full w-full object-contain"\>  
        \<p id="lightbox-caption" class="mt-2 text-center text-white"\>\</p\>  
        \<button id="lightbox-prev" class="absolute left-4 top-1/2 \-translate-y-1/2 rounded-full bg-white bg-opacity-50 p-2 text-black hover:bg-opacity-75"\>\<\</button\>  
        \<button id="lightbox-next" class="absolute right-4 top-1/2 \-translate-y-1/2 rounded-full bg-white bg-opacity-50 p-2 text-black hover:bg-opacity-75"\>\>\</button\>  
      \</div\>  
    \</div\>

##### **Step 2.2: Add Lightbox CSS**

Add the necessary styles for the lightbox modal and its controls.  
**File to Edit:** src/assets/css/style.css  
*Add the following CSS to the end of the file:*  
/\* Lightbox Styles \*/  
\#lightbox {  
  display: none; /\* Initially hidden \*/  
  align-items: center;  
  justify-content: center;  
}

\#lightbox.flex {  
  display: flex;  
}

\#lightbox-close {  
  font-size: 2rem;  
  line-height: 1;  
}

##### **Step 2.3: Modify Gallery Grid Links for Lightbox**

Update the gallery grid component so that each image link can trigger the lightbox and pass the necessary data (full image URL, title).  
**File to Edit:** src/\_includes/components/gallery-grid.njk  
\<ul class="grid grid-cols-2 md:grid-cols-3 gap-4"\>  
  {% for item in items %}  
    \<li\>  
\-     \<a href="{{ item.url }}"\>  
\+     {\# Replace direct link with a data-attribute for the lightbox and a generic href \#}  
\+     \<a href="{{ item.data.src }}" data-title="{{ item.data.title }}" class="gallery-item"\>  
        {% image item.data.src, item.data.alt, "(min-width: 30em) 50vw, 100vw", item.data.monochrome %}  
      \</a\>  
    \</li\>  
  {% endfor %}  
\</ul\>

##### **Step 2.4: Add Lightbox JavaScript Logic**

Add the JavaScript that powers the lightbox functionality.  
**File to Edit:** src/\_includes/layouts/base.njk  
*Add the following \<script\> block just before the closing \</body\> tag (after the lightbox HTML):*  
\<script\>  
  document.addEventListener('DOMContentLoaded', () \=\> {  
    const lightbox \= document.getElementById('lightbox');  
    const lightboxImage \= document.getElementById('lightbox-image');  
    const lightboxCaption \= document.getElementById('lightbox-caption');  
    const closeButton \= document.getElementById('lightbox-close');  
    const prevButton \= document.getElementById('lightbox-prev');  
    const nextButton \= document.getElementById('lightbox-next');  
    const galleryItems \= document.querySelectorAll('.gallery-item');

    let currentIndex \= 0;

    function showLightbox(index) {  
      const item \= galleryItems\[index\];  
      if (\!item) return;

      const fullImageUrl \= item.getAttribute('href');  
      const title \= item.getAttribute('data-title');

      lightboxImage.setAttribute('src', fullImageUrl);  
      lightboxImage.setAttribute('alt', title);  
      lightboxCaption.textContent \= title;  
      lightbox.classList.remove('hidden');  
      lightbox.classList.add('flex');  
      currentIndex \= index;  
      document.body.style.overflow \= 'hidden'; // Prevent background scrolling  
    }

    function hideLightbox() {  
      lightbox.classList.add('hidden');  
      lightbox.classList.remove('flex');  
      document.body.style.overflow \= 'auto';  
    }

    function showNext() {  
      const nextIndex \= (currentIndex \+ 1\) % galleryItems.length;  
      showLightbox(nextIndex);  
    }

    function showPrev() {  
      const prevIndex \= (currentIndex \- 1 \+ galleryItems.length) % galleryItems.length;  
      showLightbox(prevIndex);  
    }

    galleryItems.forEach((item, index) \=\> {  
      item.addEventListener('click', (e) \=\> {  
        e.preventDefault();  
        showLightbox(index);  
      });  
    });

    closeButton.addEventListener('click', hideLightbox);  
    nextButton.addEventListener('click', showNext);  
    prevButton.addEventListener('click', showPrev);

    // Close on clicking the background overlay  
    lightbox.addEventListener('click', (e) \=\> {  
      if (e.target \=== lightbox) {  
        hideLightbox();  
      }  
    });

    // Keyboard navigation  
    document.addEventListener('keydown', (e) \=\> {  
      if (lightbox.classList.contains('flex')) {  
        if (e.key \=== 'Escape') {  
          hideLightbox();  
        } else if (e.key \=== 'ArrowRight') {  
          showNext();  
        } else if (e.key \=== 'ArrowLeft') {  
          showPrev();  
        }  
      }  
    });  
  });  
\</script\>  
