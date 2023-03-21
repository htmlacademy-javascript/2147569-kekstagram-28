const thumbnailPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const containerPictures = document.querySelector('.pictures');

const createThumbnailPicture = ({url, likes, comments, id}) => {
  const thumbnailPicture = thumbnailPictureTemplate.cloneNode(true);

  thumbnailPicture.querySelector('.picture__img').src = url;
  thumbnailPicture.querySelector('.picture__likes').textContent = likes;
  thumbnailPicture.querySelector('.picture__comments').textContent = comments.length;
  thumbnailPicture.dataset.thumbnailId = id;

  return thumbnailPicture;
};

const renderThumbnailPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnailPicture = createThumbnailPicture(picture);
    fragment.append(thumbnailPicture);
  });
  containerPictures.append(fragment);
};

export {renderThumbnailPictures, containerPictures};
