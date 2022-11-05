export const ImageError = {
  name: 'imgerror',
  inserted: function (el, { value }) {
    el.onerror = function () {
      el.src = value;
    };
  }
};
