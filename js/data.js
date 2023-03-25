import {getRandomInteger} from './util.js';
import {getRandomArrayElement} from './util.js';
import {createIdGenerator} from './util.js';

const COMMENTS = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'
];

const NAMES = [
  'Иван',
  'Мария',
  'Александр',
  'Сергей',
  'Татьяна'
];

const DESCRIPTIONS = [
  'Мое лучшее фото.',
  'Это лучшее, что я видел за последнее время.',
  'Красота существует. Доказано этой фоткой.',
  'Фото на миллион.',
  'Wooow!'
];

const generateCommentId = createIdGenerator ();

const createMessage = () =>
  Array.from({length: getRandomInteger(1,1.5)}, () =>
    getRandomArrayElement(COMMENTS)).join(' ');

const createComment = () => ({
  id : generateCommentId (),
  avatar : `img/avatar-${getRandomInteger(1,6)}.svg`,
  message : createMessage (),
  name : getRandomArrayElement(NAMES)
});

const createPhotoDescription = (index) => ({
  id: index ,
  url:`photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS) ,
  likes: getRandomInteger(15,200),
  comments : Array.from({ length: getRandomInteger(1,20)} , createComment),
});

const getPhotoDescription = () => Array.from({length: 25},(_, photoIndex) => createPhotoDescription (photoIndex + 1)
);

export {getPhotoDescription};
