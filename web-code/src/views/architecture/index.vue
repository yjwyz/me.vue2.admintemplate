<!--
 * @Author: BORING GHOST
 * @Date: 2022-04-30 17:50:15
 * @LastEditTime: 2022-05-02 16:17:24
 * @Description:组织架构
-->
<template>
  <div class="Architecture__">
    <!-- 弹窗 -->
    <Modal width="600" :header-text="dialog_title" position="center" :show="dialog_visible" @confirm="onSubmit" @close="close">
      <el-form ref="form_dom" :rules="rules" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item v-if="formInline.hasOwnProperty('manager')" label="角色" prop="manager">
          <el-input v-model="formInline.manager" placeholder="角色"></el-input>
        </el-form-item>
        <el-form-item v-if="formInline.hasOwnProperty('icon')" label="图标" prop="icon">
          <el-input v-model="formInline.icon" placeholder="图标"></el-input>
        </el-form-item>
        <el-form-item v-if="formInline.hasOwnProperty('name')" :label="formInline.biem" prop="name">
          <el-input v-model="formInline.name" :placeholder="formInline.biem"></el-input>
        </el-form-item>
      </el-form>
    </Modal>
    <!-- 删除弹窗 -->
    <Modal width="300" :show="delVisible" header-text="提示" content-text="请确认是否删除?" @confirm="confirDel" @close="closeDel"></Modal>
    <!-- 卡片内容 -->
    <el-card v-loading="isloading" class="box-card">
      <div slot="header" class="clearfix">
        <i class="iconfont icon-xiangsu_wuqi" style="color: red; margin-right: 10px"></i>
        <span style="flex: 1">{{ title }}</span>
        <el-dropdown trigger="click" @command="handleCommand">
          <el-button size="mini" type="primary"> 更多菜单<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="0">添加部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-tree icon-class="iconfont icon-weibiaoti534" :expand-on-click-node="false" :data="tree" default-expand-all :props="defaultProps" highlight-current>
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span class="left-span">
            <i style="margin-right: 5px" class="iconfont" :class="[data.icon]" />
            {{ node.label }}
          </span>
          <span class="right-span">
            <span v-if="data.manager">
              <el-tag size="mini" type="success" style="margin-right: 10px">{{ data.manager }}</el-tag>
            </span>
            <el-dropdown v-if="data.pid === ''" trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">菜单<i class="el-icon-arrow-down el-icon--right"></i> </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-circle-plus" :command="data.id">添加角色</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span v-else>
              <i class="iconfont icon-chakan"></i>
              <a href="javascript:void(0);" style="color: #409eff" @click="lookInfo(data.id)"> 查看修改 </a>
              <i class="iconfont icon-baojian"></i>
              <a href="javascript:void(0);" style="color: red" @click="delInfo(data.id)"> 删除 </a>
            </span>
          </span>
        </span>
      </el-tree>
    </el-card>
  </div>
</template>

<script>
/* API */
import { architectureApi, addArchitectureApi, addRolesApi, lookTheIdInfo, delItemRole } from '@/api/architecture.js';
/* Tool */
import { treeInfoSplit, formRules, addBumen, addRole, lookRole } from './GHOST-T.js';

export default {
  name: 'Architecture',

  data() {
    return {
      delVisible: false, // 删除的弹窗
      isloading: false,
      current_id: '',
      dialog_title: '',
      dialog_visible: false, // 弹窗
      title: '',
      tree: [], // 树形数据
      defaultProps: {
        // 树形结构配置
        children: 'child',
        label: 'name'
      },
      formInline: {},
      form_status: 0, // 0 表示添加部门的状态
      rules: formRules()
    };
  },
  created() {
    this.getPageData();
  },
  mounted() {},

  methods: {
    /**
     * 获取所有数据
     */
    getPageData() {
      this.getArchInfo();
    },
    /**
     * 获取组织架构信息
     */
    async getArchInfo() {
      try {
        this.isloading = true;
        await this.$k.sleep(1000);
        const { data } = await architectureApi();
        this.title = data.companyName;
        this.tree = treeInfoSplit(data.depts);
      } catch (e) {
        console.log(e);
      } finally {
        this.isloading = false;
      }
    },
    /**
     * 查看某id信息
     */
    async lookInfo(id) {
      try {
        this.isloading = true;
        const { data } = await lookTheIdInfo(id);
        this.formInline = lookRole(data);
        this.dialog_visible = true;
        this.dialog_title = '查看修改';
      } catch (e) {
        console.log(e);
      } finally {
        this.isloading = false;
      }
    },
    /**
     * 删除单个角色
     */
    async delInfo(id) {
      this.delVisible = true;
      this.current_id = id;
    },
    async confirDel() {
      try {
        const { status } = await delItemRole(this.current_id);
        if (status === 200) {
          this.$k.successToast('删除成功');
          this.delVisible = false;
          this.getArchInfo();
        }
      } catch (e) {
        console.log(e);
      }
    },
    closeDel() {
      this.delVisible = false;
    },
    /**
     * 提交
     */
    onSubmit() {
      try {
        this.$refs['form_dom'].validate(async isok => {
          if (isok) {
            if (this.form_status === 0) {
              // 新增部门
              const { status } = await addArchitectureApi(this.formInline);
              if (status === 200) {
                this.$k.successToast('新增成功');
                this.dialog_visible = false;
                this.getArchInfo();
              }
            } else {
              // 新增角色
              const { status } = await addRolesApi(this.formInline);
              if (status === 200) {
                this.$k.successToast('新增成功');
                this.dialog_visible = false;
                this.getArchInfo();
              }
            }
          }
        });
      } catch (e) {
        this.$k.errorToast('新增失败');
        console.log(e);
      }
    },
    close() {
      this.dialog_visible = false;
      this.formInline = {};
    },
    /**
     * 菜单下拉事件
     */
    handleCommand(command) {
      switch (command) {
        case 0:
          this.formInline = addBumen(this.formInline);
          this.form_status = 0;
          this.dialog_title = '新增部门';
          break;
        default:
          this.formInline = addRole(this.formInline, command);
          this.form_status = 1;
          this.dialog_title = '新增角色';
          break;
      }
      this.dialog_visible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  padding-right: 8px;
  .left-span {
    margin-right: 70%;
  }
}
</style>
