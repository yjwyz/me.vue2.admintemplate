<!--
 * @Author: BORING GHOST
 * @Date: 2022-04-30 17:50:15
 * @LastEditTime: 2022-05-02 18:05:24
 * @Description:员工
-->
<template>
  <div v-loading="isloading" class="Employees__">
    <!-- 头部 -->
    <el-card class="HeaderLayout">
      <el-button type="warning" icon="el-icon-circle-plus" @click="addRole">新增</el-button>
    </el-card>
    <!-- table -->
    <el-card class="TableLayout">
      <vxe-table :align="allAlign" :data="tableData" height="700" :row-config="{ isCurrent: true, isHover: true }" :cell-class-name="cellClassName">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name">
          <template #default="{ row, rowIndex }">
            <div class="name-container">
              <span class="avater">
                <img v-imgload="`https://picsum.photos/${27 + rowIndex}/${27 + rowIndex}`" :src="`https://picsum.photos/${27 + rowIndex}/${27 + rowIndex}`" alt="" />
              </span>
              <span>{{ row.name }}</span>
            </div>
          </template>
        </vxe-column>
        <vxe-column field="city" title="City"></vxe-column>
        <vxe-column field="email" title="Email"></vxe-column>
        <vxe-column field="time" title="Time"></vxe-column>
        <vxe-column field="color" title="Color">
          <template #default="{ row }">
            <span class="cell-span-mask" :style="{ backgroundColor: row.color }">{{ row.color }}</span>
          </template>
        </vxe-column>
        <vxe-column field="level" title="Level"></vxe-column>
        <vxe-column fixed="right" width="100" title="Operation">
          <template #default="{ row }">
            <el-button type="text" @click="lookRole(row.id)">查看</el-button>
            <el-button type="text" @click="delRole(row.id)">删除</el-button>
          </template>
        </vxe-column>
      </vxe-table>
    </el-card>
    <!-- 弹窗 -->
    <Modal
      :show="is_modal"
      width="600"
      :btn-group-show="btnGroupShow"
      :header-text="header_text"
      position="top"
      header-color="orange"
      btn-confirm-active-color="rgba(255, 165, 0,0.8)"
      @confirm="confirm"
      @close="close"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="Name:" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="City:" prop="city">
          <el-input v-model="form.city"></el-input>
        </el-form-item>
        <el-form-item label="Email:" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="Time:" prop="time">
          <el-input v-model="form.time"></el-input>
        </el-form-item>
        <el-form-item label="Color:" prop="color">
          <el-input v-model="form.color"></el-input>
        </el-form-item>
        <el-form-item label="Level:" prop="level">
          <el-input v-model="form.level"></el-input>
        </el-form-item>
      </el-form>
    </Modal>
  </div>
</template>

<script>
/* api */
import { rolesApi, addRole, lookRole, delRole } from '@/api/employees.js';
/* Tool */
import G_ from './GHOST-T.js';

export default {
  name: 'Employees',

  data() {
    return {
      btnGroupShow: true,
      header_text: '',
      isloading: false,
      allAlign: null,
      tableData: [],
      is_modal: false,
      form: {},
      rules: G_.rules()
    };
  },
  created() {
    this.getPageList();
  },
  mounted() {},

  methods: {
    /**
     * 查看单个
     */
    async lookRole(id) {
      try {
        if (!id) return;
        this.isloading = true;
        const { data } = await lookRole(id);
        this.isloading = false;
        this.form = data;
        this.header_text = '查看';
        this.btnGroupShow = false;
        this.is_modal = true;
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 删除
     */
    delRole(id) {
      try {
        this.$confirm('确认删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async () => {
            const { data } = await delRole(id);
            this.getRolesInfo();
            this.$k.successToast(data);
          })
          .catch(e => this.$k.successToast('cancel!'));
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * 新增
     */
    addRole() {
      this.header_text = '新增';
      this.btnGroupShow = true;
      this.is_modal = true;
    },
    /**
     * 模态框
     */
    close() {
      this.is_modal = false;
      this.form = {};
    },
    confirm() {
      try {
        this.$refs['form'].validate(async isok => {
          if (!isok) return;
          this.isloading = true;
          const { status } = await addRole(this.form);
          this.close();
          this.isloading = false;
          if (status === 200) this.$k.successToast('添加成功');
          this.getRolesInfo();
        });
      } catch (e) {
        this.isloading = false;
        console.log(e);
      }
    },
    /**
     * 获取所有数据
     */
    getPageList() {
      this.getRolesInfo();
    },
    /**
     * 获取所有人物资料
     */
    async getRolesInfo() {
      try {
        this.isloading = true;
        await this.$k.sleep(1000);
        const { data } = await rolesApi();
        this.tableData = data;
      } catch (e) {
        console.log(e);
      } finally {
        this.isloading = false;
      }
    },
    /**
     * 列样式
     */
    cellClassName({ columnIndex }) {
      if (columnIndex === 6) return 'orange';
      if (columnIndex === 2) return 'font-w';
    }
  }
};
</script>

<style lang="scss" scoped>
.HeaderLayout {
  margin-bottom: 10px;
}
::v-deep .vxe-header--row {
  background-color: teal;
  color: white;
}
::v-deep .orange {
  color: orange;
}
::v-deep .font-w {
  font-size: 19px;
  font-weight: 700;
}
::v-deep .cell-span-mask {
  padding: 5px;
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 128, 128, 0.3);
}
::v-deep .name-container {
  display: flex;
  .avater {
    width: 30px;
    height: 30px;
    background-color: teal;
    border-radius: 5px;
    margin-right: 5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
