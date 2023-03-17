import {openBigPicture} from './big-picture.js';
import {returnThumbnailPicture, containerPictures} from './thumbnail.js';

const renderPictureModale = (pictures) => {
  containerPictures.addEventListener('click', (evt) => {
    const thumbnailPicture = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnailPicture) {
      return;
    }
    const picture = pictures.find (
      (item) => item.id === +thumbnailPicture.dataset.thumbnailId
    );
    openBigPicture(picture);
  });
  returnThumbnailPicture(pictures,containerPictures);
};

export {renderPictureModale};
