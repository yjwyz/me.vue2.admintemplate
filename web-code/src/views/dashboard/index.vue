<!--
 * @Author: BORING GHOST
 * @Date: 2022-04-17 13:40:41
 * @LastEditTime: 2022-05-02 13:51:16
 * @Description:
-->
<template>
  <div class="Dashboard__">
    <!-- 头部 -->
    <el-card class="HeaderLayout">
      <div class="header">
        <img :src="avatar" alt="" />
      </div>
      <div class="text">
        <div class="name">{{ name }}</div>
        <div class="introduction">{{ introduction }}</div>
      </div>
    </el-card>
    <!-- 展示 -->
    <el-card class="calendar_">
      <el-calendar v-model="value"> </el-calendar>
    </el-card>
    <el-card class="infiniteScroll_">
      <div slot="header" class="clearfix">
        <el-badge :value="imgs_length" class="item" type="primary">
          <el-alert title="图片" type="warning" :closable="false" effect="dark" show-icon> </el-alert>
        </el-badge>
      </div>
      <div v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <template v-for="(item, index) in imgs">
          <div :key="index" class="item">
            <img v-imgload="item" :src="item" alt="" />
          </div>
        </template>
        <div class="mask"></div>
        <div class="mask"></div>
        <div class="mask"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Dashboard',
  data() {
    return {
      value: new Date(),
      count: 0,
      imgs: []
    };
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'introduction']),
    imgs_length: function () {
      return this.imgs.length;
    }
  },
  created() {
    this.addImg(30);
  },
  mounted() {
    // this.openConfir();
  },
  methods: {
    load() {
      this.addImg(10);
    },
    /**
     * 添加num张图片
     */
    addImg(num = 10) {
      const img_item = 'https://picsum.photos/__KEY__/__KEY__';
      const min = 190;
      let random = 190;
      // eslint-disable-next-line prefer-const
      let result_ = [];
      for (let k = 0, len = num; k < len; k++) {
        random = Math.floor(Math.random() * (230 - min) + min);
        result_[k] = img_item.replace(/__KEY__/g, random);
      }
      this.imgs.push(...result_);
    }
  }
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
