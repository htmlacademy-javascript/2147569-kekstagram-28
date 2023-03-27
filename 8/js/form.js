import {isEscapeKey} from './util.js';

const formImageEdit = document.querySelector('.img-upload__form');
const fieldImage = formImageEdit.querySelector ('#upload-file');
const overlayImage = formImageEdit.querySelector ('.img-upload__overlay');
const buttonOverlayClose = formImageEdit.querySelector ('#upload-cancel');
const body = document.querySelector('body');
const fieldComments = formImageEdit.querySelector ('.text__description');
const fieldHashtags = formImageEdit.querySelector ('.text__hashtags');
const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_TAG_TEXT = 'В заполнении хэштегов допущенны ошибки';

const pristine = new Pristine(formImageEdit, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const onEscapeOverlay = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    overlayImage.classList.add('hidden');
    body.classList.remove('modal-open');
    formImageEdit.reset();
    pristine.reset();
  }
};

const fieldCommentsFocus = () => {
  fieldComments.addEventListener('focus' ,() => {
    document.removeEventListener('keydown', onEscapeOverlay);
  });

  fieldComments.addEventListener('blur' ,() => {
    document.addEventListener('keydown', onEscapeOverlay);
  });
};

const fieldHashtagsFocus = () => {
  fieldHashtags.addEventListener('focus' ,() => {
    document.removeEventListener('keydown', onEscapeOverlay);
  });

  fieldHashtags.addEventListener('blur' ,() => {
    document.addEventListener('keydown', onEscapeOverlay);
  });
};

const validHashtagCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const uniqueHashtag = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validHashtag = (tag) => VALID_SYMBOLS.test(tag);

const isValidateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return validHashtagCount(tags) && uniqueHashtag(tags) && tags.every(validHashtag);
};

pristine.addValidator(
  fieldHashtags,
  isValidateTags,
  ERROR_TAG_TEXT
);

const closeImageModal = () => {
  overlayImage.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeOverlay);
  buttonOverlayClose.removeEventListener('click', closeImageModal);
  formImageEdit.reset();
  pristine.reset();
};

const openImageModal = () => {
  overlayImage.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeOverlay);
  buttonOverlayClose.addEventListener('click', closeImageModal);
  fieldCommentsFocus();
  fieldHashtagsFocus();
};

const inputImageChange = () => {
  openImageModal();
};

fieldImage.addEventListener ('change', inputImageChange);
