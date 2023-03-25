import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const listComments = bigPicture.querySelector('.social__comments');
const elementListCopy = listComments.querySelector('li').cloneNode(true);
const body = document.querySelector('body');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
let allComments;
let commentsShow = 0;
const COMMENTS_PORTION = 5;

const onEscape = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsShow = 0;
    allComments = [];
  }
};

const renderNewComments = (arrayComment) => {
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


const loadComments = () => {
  const nextComments = allComments.slice(commentsShow, commentsShow + COMMENTS_PORTION);
  commentsShow += nextComments.length;
  renderNewComments(nextComments);

  if (commentsShow >= allComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  commentCount.innerHTML = `${commentsShow} из <span class="comments-count"> ${allComments.length}</span> комментариев`;
};

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  listComments.innerHTML = '';
  allComments = comments;
  loadComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onEscape);
  commentsLoader.removeEventListener('click', loadComments);
  commentsShow = 0;
  allComments = [];
};

export const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscape);
  commentsLoader.addEventListener('click', loadComments);

  renderBigPicture(picture);
};
