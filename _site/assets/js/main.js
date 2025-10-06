document.addEventListener('DOMContentLoaded', () => {
 const galleryItems = document.querySelectorAll('.gallery-item');
 if (galleryItems.length === 0) return;

 const lightbox = document.createElement('div');
 lightbox.className = 'lightbox';
 document.body.appendChild(lightbox);

 const lightboxContent = document.createElement('div');
 lightboxContent.className = 'lightbox-content';
 lightbox.appendChild(lightboxContent);

 const lightboxImage = document.createElement('img');
 lightboxContent.appendChild(lightboxImage);

 const closeButton = document.createElement('button');
 closeButton.className = 'lightbox-close';
 closeButton.innerHTML = '×';
 lightboxContent.appendChild(closeButton);

 const nextButton = document.createElement('button');
 nextButton.className = 'lightbox-next';
 nextButton.innerHTML = '›';
 lightboxContent.appendChild(nextButton);

 const prevButton = document.createElement('button');
 prevButton.className = 'lightbox-prev';
 prevButton.innerHTML = '‹';
 lightboxContent.appendChild(prevButton);

 let currentIndex = 0;
 const photos = Array.from(galleryItems).map(item => ({
   src: item.dataset.largeSrc,
   title: item.dataset.title,
 }));

 function showImage(index) {
   if (index < 0 || index >= photos.length) return;
   currentIndex = index;
   lightboxImage.src = photos[currentIndex].src;
   lightbox.classList.add('active');
 }

 galleryItems.forEach((item, index) => {
   item.addEventListener('click', () => {
     showImage(index);
   });
 });

 closeButton.addEventListener('click', () => lightbox.classList.remove('active'));
 nextButton.addEventListener('click', () => showImage(currentIndex + 1));
 prevButton.addEventListener('click', () => showImage(currentIndex - 1));

 document.addEventListener('keydown', (e) => {
   if (e.key === 'Escape' && lightbox.classList.contains('active')) {
     lightbox.classList.remove('active');
   }
   if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
     showImage(currentIndex + 1);
   }
   if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
     showImage(currentIndex - 1);
   }
 });
});
