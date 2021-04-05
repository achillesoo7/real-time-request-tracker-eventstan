exports.sleep = function (time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

exports.getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
