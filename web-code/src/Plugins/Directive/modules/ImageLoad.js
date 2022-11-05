import gif from '@/assets/gif/89fc-fyscsmv5911424.gif';

export const ImageLoad = {
  name: 'imgload',
  inserted: function (el, { value }) {
    el.src = gif;
    el.onload = function () {
      el.src = value;
    };
  }
};
