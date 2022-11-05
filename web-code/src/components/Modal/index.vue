<!--
 * @Author: BORING GHOST
 * @Date: 2022-05-02 05:53:11
 * @LastEditTime: 2022-05-02 16:52:58
 * @Description:全局模态框
-->
<template>
  <div
    v-show="modalShow"
    :style="{
      zIndex: zIndex
    }"
    class="modal-mask"
  >
    <div
      ref="uiModal"
      class="ui-modal"
      :style="{
        width: width + 'px',
        borderRadius: borderRadius + 'px',
        marginLeft: -width / 2 + 'px',
        top: position === 'center' ? '25%' : '50px',
        marginTop: position === 'center' ? -uiModalHeight / 2 + 'px' : ''
      }"
    >
      <header
        class="header"
        :style="{
          color: headerTextColor,
          backgroundColor: headerColor
        }"
      >
        <h1>{{ headerText }}</h1>
        <a
          :style="{
            color: headerTextColor
          }"
          href="javascript:;"
          @click="close"
        >
          &times;
        </a>
      </header>
      <article class="content">
        <p
          :style="{
            color: contentTextColor
          }"
        >
          {{ contentText }}
        </p>
        <slot></slot>
      </article>
      <div v-if="btnGroupShow" class="btn-group">
        <button
          :style="{
            backgroundColor: headerColor
          }"
          class="btn btn-confirm"
          @click="confirm"
        >
          {{ confirmText }}
        </button>
        <button class="btn btn-cancel" @click="close">{{ cancelText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalModal',
  props: {
    width: {
      type: String,
      default: '350'
    },
    show: {
      type: Boolean,
      default: false
    },
    borderRadius: {
      type: String,
      default: '10'
    },
    headerColor: {
      type: String,
      default: '#007bff'
    },
    headerTextColor: {
      type: String,
      default: '#fff'
    },
    headerText: {
      type: String,
      default: 'This is a MODAL'
    },
    handerTextColor: {
      type: String,
      default: '#fff'
    },
    contentText: {
      type: String,
      default: ''
    },
    contentTextColor: {
      type: String,
      default: '#333'
    },
    position: {
      type: String,
      default: 'center'
    },
    btnGroupShow: {
      type: Boolean,
      default: true
    },
    btnConfirmActiveColor: {
      type: String,
      default: 'rgba(0, 123, 255, 0.8)'
    },
    confirmText: {
      type: String,
      default: '是'
    },
    cancelText: {
      type: String,
      default: '否'
    },
    zIndex: {
      type: Number,
      default: 99,
      validator: function (value) {
        return 99 + value;
      }
    }
  },
  data() {
    return {
      modalShow: false,
      uiModal: null,
      uiModalHeight: 0
    };
  },
  watch: {
    show(newv) {
      this.modalShow = newv;
    }
  },
  created() {
    this.modalShow = this.show;
  },
  mounted() {
    this.uiModalHeight = this.$refs['uiModal'].clientHeight;
    document.styleSheets[0].addRule('.btn-confirm:active', `background-color:${this.btnConfirmActiveColor} !important`);
  },

  methods: {
    confirm() {
      this.$emit('confirm');
    },
    close() {
      this.modalShow = false;
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
  a {
    text-decoration: none;
    outline: none;
    color: #333;
  }
  h1,
  p {
    font-weight: normal;
    margin: 0;
  }
  button {
    outline: none;
    border: none;
  }

  .ui-modal {
    position: fixed;
    left: 50%;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 1px 2px 3px #333;
    .header {
      height: 44px;
      padding: 0 15px;
      box-sizing: border-box;
      h1 {
        display: inline-block;
        font-size: 18px;
        line-height: 44px;
      }
      a {
        float: right;
        font-size: 20px;
        margin-top: 6px;
      }
    }
    .content {
      padding: 15px;
      box-sizing: border-box;
    }
    .btn-group {
      height: 30px;
      padding: 10px 15px;
      border-top: 1px solid #ddd;
      box-sizing: content-box;

      .btn {
        float: right;
        min-width: 80px;
        height: 30px;
        font-size: 14px;
        border-radius: 3px;
        cursor: pointer;

        &.btn-confirm {
          background-color: #fff;
          margin-left: 15px;
          &:active {
            color: rgba(0, 0, 0, 0.6);
          }
        }
        &.btn-cancel {
          background-color: #ddd;
          color: #666;
          &:active {
            background-color: rgba(221, 221, 221, 0.8) !important;
            color: rgba(102, 102, 102, 0.6);
          }
        }
      }
    }
  }
}
</style>
