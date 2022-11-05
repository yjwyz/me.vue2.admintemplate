export default {
  sleep: function (time = 1500) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  }
};
