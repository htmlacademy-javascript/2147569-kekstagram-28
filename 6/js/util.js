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

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger};
export {getRandomArrayElement};
export {createIdGenerator};
export {isEscapeKey};
