const PICTURES_COUNT = 10;

const filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filterElement = document.querySelector('.img-filters');

let currentFilter = filter.DEFAULT;
let pictures = [];

const sortRandom = () => Math.random() - 0.5;
const sortComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

export const filteredPictures = () => {
  switch (currentFilter) {
    case filter.RANDOM:
      return [...pictures].sort(sortRandom).slice(0,PICTURES_COUNT);
    case filter.DISCUSSED:
      return [...pictures].sort(sortComments);
    default:
      return [...pictures];
  }
};

const filterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    callback(filteredPictures());
  });
};

export const init = (loadedPictures, callback) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  filterClick(callback);
};
