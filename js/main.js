const COMMENTS = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Мария',
  'Александр'
];

const DESCRIPTIONS = [
  'Мое лучшее селфи.',
  'Отдых на озере в компании лучших друзей.',
  'Красота существует. Доказано этой фоткой.'
];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const getRandomArrayElement = (array) => array[getRandomInteger(0,array.length - 1)];

const createIdGenerator = () => {
  let lastGenerateID = 0;

  return () => {
    lastGenerateID += 1;
    return lastGenerateID;
  };
};

const generateCommentId = createIdGenerator ();

const createMessage = () =>
  Array.from({length: getRandomInteger(1,2)}, () =>
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
  comments : Array.from({ length: getRandomInteger(1,10)} , createComment),
});

const getPhotoDescription = () => Array.from({length: 25},(_, photoIndex) => createPhotoDescription (photoIndex + 1)
);

getPhotoDescription();
