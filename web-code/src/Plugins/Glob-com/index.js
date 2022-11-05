/*
 * @Author: BORING GHOST
 * @Date: 2022-04-17 18:14:23
 * @LastEditTime: 2022-05-02 16:19:45
 * @Description:全局组件注册
 */
import Modal from '@/components/Modal/index.vue';

export default {
  install: vm => {
    vm.component('Modal', Modal);
  }
};
