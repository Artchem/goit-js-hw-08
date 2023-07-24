// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');
const markupGallery = makeMarkupFromArray(galleryItems);

galleryRef.insertAdjacentHTML('beforeend', markupGallery);

function makeMarkupFromArray(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              alt="${description}"
            />
          </a>
    </li>
    `;
    })
    .join('');
}

let gallery = new SimpleLightbox('.gallery__link', { captionsData: 'alt' });
