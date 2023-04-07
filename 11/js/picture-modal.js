import {openBigPicture} from './big-picture.js';
import {renderThumbnailPictures, containerPictures} from './thumbnail.js';

let pictures = [];

const modalClick = (evt) => {
  const thumbnailPicture = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnailPicture) {
    return;
  }

  evt.preventDefault();

  const picture = pictures.find (
    (item) => item.id === +thumbnailPicture.dataset.thumbnailId
  );
  openBigPicture(picture);
};


export const renderPictureModal = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnailPictures(pictures);
  containerPictures.addEventListener('click', modalClick);
};
