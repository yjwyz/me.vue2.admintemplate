/*
 * @Author: BORING GHOST
 * @Date: 2022-04-18 16:18:14
 * @LastEditTime: 2022-05-02 11:34:39
 * @Description: 封装全局函数
 */

import toast from './Toast/index.js'; // 弹窗函数
import Fn from './Fn/index.js';
export default {
  install: Vue => {
    Vue.prototype.$k = {
      ...Fn,
      ...toast
    };
  }
};
