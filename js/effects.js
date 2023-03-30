const imageUpload = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.effects');
const sliderEffect = document.querySelector('.effect-level__slider');
const sliderEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;
const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const openSlider = () => {
  sliderEffectLevel.classList.remove('hidden');
};

const closeSlider = () => {
  sliderEffectLevel.classList.add('hidden');
};

const updateSlider = () => {
  sliderEffect.noUiSlider.updateOptions(
    {
      range: {
        min: chosenEffect.min,
        max: chosenEffect.max
      },
      step: chosenEffect.step,
      start: chosenEffect.max
    });

  if (isDefault()) {
    closeSlider();
  } else {
    openSlider();
  }
};

const effectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imageUpload.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

const onUpdateSlider = () => {
  const sliderValue = sliderEffect.noUiSlider.get();
  imageUpload.style.filter = isDefault() ? DEFAULT_EFFECT.style : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelValue.value = sliderValue;
};

export const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(sliderEffect, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower'
});

closeSlider();

effects.addEventListener('change', effectsChange);
sliderEffect.noUiSlider.on('update', onUpdateSlider);
