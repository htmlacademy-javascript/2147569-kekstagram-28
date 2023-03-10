const thumbnailPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const containerPictures = document.querySelector('.pictures');

const createThumbnailPicture = ({url, likes, comments}) => {
  const thumbnailPicture = thumbnailPictureTemplate.cloneNode(true);

  thumbnailPicture.querySelector('.picture__img').src = url;
  thumbnailPicture.querySelector('.picture__likes').textContent = likes;
  thumbnailPicture.querySelector('.picture__comments').textContent = comments.length;

  return thumbnailPicture;
};

const returnThumbnailPicture = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnailPicture = createThumbnailPicture(picture);
    fragment.append(thumbnailPicture);
  });
  containerPictures.append(fragment);
};

export {returnThumbnailPicture};
