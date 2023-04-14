import {isEscapeKey} from './util.js';
import {resetScale, buttonScaleOn, buttonScaleOf} from './scaling-image.js';
import {resetEffects} from './effects.js';
import {loadUserPhoto} from './user-photo.js';

const formImageEdit = document.querySelector('.img-upload__form');
const fieldImage = formImageEdit.querySelector('#upload-file');
const overlayImage = formImageEdit.querySelector('.img-upload__overlay');
const overlayCloseHandler = formImageEdit.querySelector ('#upload-cancel');
const buttonUploadSubmit = formImageEdit.querySelector ('#upload-submit');
const body = document.querySelector('body');
const fieldComments = formImageEdit.querySelector('.text__description');
const fieldHashtags = formImageEdit.querySelector('.text__hashtags');

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ERROR_TAG_TEXT = 'В заполнении хэштегов допущенны ошибки';
const submitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Сохраняю...'
};

const pristine = new Pristine(formImageEdit, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

const blockSubmitButton = () => {
  buttonUploadSubmit.disabled = true;
  buttonUploadSubmit.textContent = submitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  buttonUploadSubmit.disabled = false;
  buttonUploadSubmit.textContent = submitButtonText.IDLE;
};

export const formSubmit = (cb) => {
  formImageEdit.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(formImageEdit));
      unblockSubmitButton();
    }
  });
};

const onEscapeOverlay = (evt) => {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    overlayImage.classList.add('hidden');
    body.classList.remove('modal-open');
    formImageEdit.reset();
    pristine.reset();
    resetScale();
    resetEffects();
    offFocusModal();
    buttonScaleOf();
    document.removeEventListener('keydown', onEscapeOverlay);
  }
};

const fieldFocus = (field) => {
  field.addEventListener('focus' ,() => {
    document.removeEventListener('keydown', onEscapeOverlay);
    body.classList.add('modal-open');
  });
};
const fieldBlur = (field) => {
  field.addEventListener('blur' ,() => {
    document.addEventListener('keydown', onEscapeOverlay);
  });
};

const fieldFocusRemove = (field) => {
  field.removeEventListener('focus' ,() => {
    document.removeEventListener('keydown', onEscapeOverlay);
  });
};
const fieldBlurRemove = (field) => {
  field.removeEventListener('blur' ,() => {
    document.addEventListener('keydown', onEscapeOverlay);
  });
};

function onFocusModal () {
  fieldFocus(fieldComments);
  fieldBlur(fieldComments);
  fieldFocus(fieldHashtags);
  fieldBlur(fieldHashtags);
}

function offFocusModal () {
  fieldFocusRemove(fieldComments);
  fieldBlurRemove(fieldComments);
  fieldFocusRemove(fieldHashtags);
  fieldBlurRemove(fieldHashtags);
}

const getValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const getUniqueHashtag = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const getValidHashtag = (tag) => VALID_SYMBOLS.test(tag);

const isValidateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return getValidCount(tags) && getUniqueHashtag(tags) && tags.every(getValidHashtag);
};

pristine.addValidator(
  fieldHashtags,
  isValidateTags,
  ERROR_TAG_TEXT
);

export const closeImageModal = () => {
  overlayImage.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeOverlay);
  overlayCloseHandler.removeEventListener('click', closeImageModal);
  formImageEdit.reset();
  pristine.reset();
  offFocusModal();
  resetScale();
  buttonScaleOf();
  resetEffects();
};

const openImageModal = () => {
  overlayImage.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeOverlay);
  overlayCloseHandler.addEventListener('click', closeImageModal);
  onFocusModal();
  buttonScaleOn();
  loadUserPhoto();
};

const onChangeModal = () => {
  openImageModal();
};

fieldImage.addEventListener ('change', onChangeModal);
