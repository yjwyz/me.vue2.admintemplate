/*
 * @Author: BORING GHOST
 * @Date: 2022-04-18 19:06:41
 * @LastEditTime: 2022-05-02 13:49:13
 * @Description:自定义指令
 */
import { ImageError } from './modules/ImageError.js'; // 图片加载错误
import { ImageLoad } from './modules/ImageLoad.js'; // 图片加载错误
const CONFIT = [ImageError, ImageLoad];
/**
 * The following are the contents of these functions
 * Don't fix it
 * Please do not move
 * And don't listen to me
 */
export default {
  install: function (Vue) {
    try {
      for (let k = 0; k < CONFIT.length; k++) {
        if (!CONFIT[k] || !CONFIT[k]['name']) continue;
        Vue.directive(CONFIT[k]['name'], CONFIT[k]);
      }
    } catch (error) {
      console.log(error);
    }
  }
};
