/*
 * @Author: BORING GHOST
 * @Date: 2022-04-18 17:26:08
 * @LastEditTime: 2022-05-01 11:28:41
 * @Description: 弹窗提醒 函数封装
 * @Docs:https://github.com/shakee93/vue-toasted
 */

import Toasted from 'vue-toasted'; // 提示框
import Vue from 'vue';
Vue.use(Toasted); // 提示框
export default {
  /**
   * @event: 成功类型的提醒
   * @param {this} 需要传入一个this指针
   * @param {String} 内容,默认Ok
   */
  successToast: function (content = 'OK !') {
    try {
      Vue.toasted.show(content, {
        position: 'top-center',
        duration: '1500',
        iconPack: 'custom-class',
        icon: 'iconfont icon-chenggong',
        fullWidth: false,
        className: 'toast-custom-class',
        type: 'success'
      });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * @event: 失败类型的提醒
   * @param {*} this_ this指针
   * @param {*} content 默认error!
   */
  errorToast: function (content = 'error !') {
    try {
      Vue.toasted.show(content, {
        position: 'top-center',
        duration: '1500',
        iconPack: 'custom-class',
        icon: 'iconfont icon-jinggao',
        fullWidth: false,
        className: 'toast-custom-class',
        type: 'error'
      });
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * @event: info类型的提醒
   * @param {*} this_ this指针
   * @param {*} content 默认error!
   */
  infoToast: function (content = 'info !') {
    try {
      Vue.toasted.show(content, {
        position: 'top-center',
        duration: '1500',
        iconPack: 'custom-class',
        icon: 'iconfont icon-duihuaxinxitianchong',
        fullWidth: false,
        className: 'toast-custom-class',
        type: 'info'
      });
    } catch (error) {
      console.log(error);
    }
  }
};
