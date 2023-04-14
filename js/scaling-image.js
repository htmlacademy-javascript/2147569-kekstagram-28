const imageUpload = document.querySelector('.img-upload__preview img');
const onSmallerClick = document.querySelector('.scale__control--smaller');
const onBiggerClick = document.querySelector('.scale__control--bigger');
const buttonValueControl = document.querySelector('.scale__control--value');

const STEP = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const DEFAULT_VALUE = 100;

const imageScale = (value) => {
  imageUpload.style.transform = `scale(${value / 100})`;
  buttonValueControl.value = `${value}%`;
};

const buttonSmallerClick = () => {
  const currentValue = parseInt(buttonValueControl.value, 10);
  let newValue = currentValue - STEP;
  if (newValue < MIN_VALUE) {
    newValue = MIN_VALUE;
  }
  imageScale(newValue);
};

const buttonBiggerClick = () => {
  const currentValue = parseInt(buttonValueControl.value, 10);
  let newValue = currentValue + STEP;
  if (newValue > MAX_VALUE) {
    newValue = MAX_VALUE;
  }
  imageScale(newValue);
};

export const buttonScaleOn = () => {
  onSmallerClick.addEventListener('click', buttonSmallerClick);
  onBiggerClick.addEventListener('click', buttonBiggerClick);
};

export const buttonScaleOf = () => {
  onSmallerClick.removeEventListener('click', buttonSmallerClick);
  onBiggerClick.removeEventListener('click', buttonBiggerClick);
};

export const resetScale = () => imageScale(DEFAULT_VALUE);
