import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const listComments = bigPicture.querySelector('.social__comments');
const commentCopy = listComments.cloneNode(true);
const body = document.querySelector('body');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const onEscape = document.addEventListener('keydown', (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
});

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  return bigPicture;
};

const renderNewComment = (comments) => {
  listComments.innerHTML = '';
  const commentFragment = document.createDocumentFragment();

  comments.forEach(({avatar, name, message}) => {
    commentCopy.querySelector('.social__picture').src = avatar;
    commentCopy.querySelector('.social__picture').alt = name;
    commentCopy.querySelector('.social__text').textContent = message;

    commentFragment.append(commentCopy);
  });
  listComments.append(commentFragment);

  return listComments;
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscape);
};

export const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.add('hidden');
  commentCount.classList.add('hidden');
  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscape);

  renderBigPicture(picture);
  renderNewComment();
};
