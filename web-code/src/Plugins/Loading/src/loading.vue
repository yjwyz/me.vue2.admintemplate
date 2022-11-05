<!--
 * @Author: BORING GHOST
 * @Date: 2022-05-02 08:28:58
 * @LastEditTime: 2022-05-02 08:47:43
 * @Description:
-->
<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div v-show="visible" class="el-loading-mask" :style="{ backgroundColor: background || '', cursor: 'wait' }" :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="el-loading-spinner">
        <img v-if="!spinner" height="80" src="https://n.sinaimg.cn/sinacn17/w120h120/20180314/89fc-fyscsmv5911424.gif" />
        <i v-else :class="spinner"></i>
        <p v-if="text" style="color: #41b883; font-size: 18px; font-weight: 700" class="el-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: '',
      text__: '加载中...'
    };
  },
  methods: {
    handleAfterLeave() {
      this.$emit('after-leave');
    },
    setText(text) {
      this.text = text;
      if (this.text__) {
        this.text = this.text__;
      }
    }
  }
};
</script>
