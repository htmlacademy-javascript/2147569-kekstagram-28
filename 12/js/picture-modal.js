import {openBigPicture} from './big-picture.js';
import {renderThumbnailPictures, containerPictures} from './thumbnail.js';

let pictures = [];

const onClick = (evt) => {
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


export const renderPictures = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnailPictures(pictures);
  containerPictures.addEventListener('click', onClick);
};
