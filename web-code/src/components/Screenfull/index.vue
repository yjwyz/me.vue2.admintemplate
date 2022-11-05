<!--
 * @Author: BORING GHOST
 * @Date: 2022-04-18 20:08:05
 * @LastEditTime: 2022-04-18 20:39:17
 * @Description:
-->
<template>
  <div>
    <svg-icon class-name="screenfull-svg" :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="click" />
  </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    click() {
      if (!screenfull.enabled) {
        this.$k.errorToast(this, 'you browser can not work');
        return false;
      }
      screenfull.toggle();
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change);
      }
    }
  }
};
</script>

<style scoped>
.screenfull-svg {
  display: inline-block !important;
  cursor: pointer !important;
  fill: #64d9d6 !important;
  width: 34px !important;
  height: 100% !important;
  vertical-align: 10px !important;
}
</style>
