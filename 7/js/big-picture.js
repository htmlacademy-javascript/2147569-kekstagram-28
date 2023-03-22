import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const listComments = bigPicture.querySelector('.social__comments');
const elementListCopy = listComments.querySelector('li').cloneNode(true);
const body = document.querySelector('body');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
let commentsShow = 0;
const COMMENTS_PORTION = 5;

const onEscape = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsShow = 0;
  }
};

const renderNewComment = (arrayComment) => {
  listComments.innerHTML = '';
  const commentFragment = document.createDocumentFragment();

  arrayComment.forEach(({avatar, name, message}) => {
    const comment = elementListCopy.cloneNode(true);

    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;

    commentFragment.append(comment);
  });
  listComments.append(commentFragment);
};


const commentLoad = () => {
  const listCommentsLength = listComments.getElementsByTagName('li').length;
  const listCommentsElement = listComments.getElementsByTagName('li');
  const listCommentsArray = Array.from(listCommentsElement);

  commentsShow += COMMENTS_PORTION;
  if (commentsShow >= listCommentsLength) {
    commentsLoader.classList.add('hidden');
    commentsShow = listCommentsLength;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragmentLoad = document.createDocumentFragment();
  for (let i = 0; i < commentsShow; i++) {
    const commentElement = listCommentsArray[i];
    fragmentLoad.append(commentElement);
  }

  listComments.innerHTML = '';
  listComments.append(fragmentLoad);
  commentCount.innerHTML = `${commentsShow} из <span class="comments-count"> ${listCommentsLength}</span> комментариев`;
};

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  renderNewComment(comments);
  commentLoad();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscape);
  commentsLoader.removeEventListener('click', commentLoad);
  commentsShow = 0;
};

export const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscape);
  commentsLoader.addEventListener('click', commentLoad);

  renderBigPicture(picture);
};
