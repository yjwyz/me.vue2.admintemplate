<!--
 * @Author: BORING GHOST
 * @Date: 2022-04-30 17:50:15
 * @LastEditTime: 2022-05-04 14:30:04
 * @Description:公司设置
-->
<template>
  <div class="Company__">
    <!-- 头部 -->
    <el-card class="HeaderLayout">
      <el-button type="success" icon="el-icon-circle-plus-outline">新增</el-button>
    </el-card>
    <!-- 内容区 -->
    <div class="ContentLayout">
      <template v-for="item in company">
        <el-card :key="item.id" class="item">
          <div slot="header" class="clearfix">
            <span class="iconfont icon-yonghu"></span>
            <span style="color: #0277bd; font-weight: 700">{{ item.job }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="setInputCompanyEvent(item.id)">{{ current_id !== item.id ? '修改' : '提交' }}</el-button>
          </div>
          <el-input v-model="item.id" class="item-input" :readonly="current_id !== item.id">
            <template slot="prepend">编号</template>
          </el-input>
          <el-input v-model="item.job" class="item-input" :readonly="current_id !== item.id">
            <template slot="prepend">职务</template>
          </el-input>
          <div class="item-input">
            <el-tag type="info">人员 :</el-tag>
            <template v-for="name in item.names">
              <el-tag :key="name" style="margin: 5px" type="success">{{ name }}</el-tag>
            </template>
          </div>
        </el-card>
      </template>
      <div class="mask"></div>
    </div>
  </div>
</template>

<script>
/* api */
import { companyListApi } from '@/api/company.js';

export default {
  name: 'Company',

  data() {
    return {
      company: [], // 公司信息
      current_id: '' // 正在修改的职务id
    };
  },
  created() {
    this.getPageList();
  },
  mounted() {},

  methods: {
    /**
     *单个卡片点击修改事件
     */
    setInputCompanyEvent(id) {
      this.current_id = id;
    },
    getPageList() {
      this.getCompanyInfo();
    },
    /**
     * 获取公司信息
     */
    async getCompanyInfo() {
      try {
        const { data } = await companyListApi();
        this.company = data;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.HeaderLayout {
  margin-bottom: 10px;
}
.ContentLayout {
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  flex-wrap: wrap;
  .item {
    width: 49%;
    margin-bottom: 10px;
    .item-input {
      margin-bottom: 10px;
    }
  }
  .mask {
    width: 49%;
  }
}
</style>
