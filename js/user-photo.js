const imageField = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview img');
const effects = document.querySelectorAll('.effects__preview');
const FILES_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'svg'];

export const loadUserPhoto = () => {
  const file = imageField.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
    effects.forEach((item) => (item.style.backgroundImage = `url('${imagePreview.src}')`));
  }
};
