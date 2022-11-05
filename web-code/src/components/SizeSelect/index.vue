<!--
 * @Author: BORING GHOST
 * @Date: 2022-04-18 20:43:45
 * @LastEditTime: 2022-04-18 21:11:47
 * @Description:
-->
<template>
  <el-dropdown class="dropdown_" trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="theme-icon" icon-class="theme" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :command="item.value">
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Dark', value: 'dark' }
      ]
    };
  },
  methods: {
    /**
     * @event: 选择了某个值
     * @param {*}
     */
    handleSetSize(e) {
      this.$k.infoToast(this, e);
    }
  }
};
</script>
<style scoped>
.dropdown_ .el-dropdown-selfdefine {
  height: 100% !important;
}
.theme-icon {
  height: 100% !important;
  width: 40px !important;
  margin-right: 10px;
}
</style>
