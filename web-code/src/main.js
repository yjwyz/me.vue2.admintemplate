import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import '@/assets/font/iconfont.css'; // font icon

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from '@/Plugins/Element/index.js'; // element按需引入

import GlobCom from '@/Plugins/Glob-com/index.js'; // 全局组件注册

import Loading from '@/Plugins/Loading/index.js';

import '@/styles/index.scss'; // global css

import GlobFn from './Plugins/Glob-Fn/index.js'; // 全局函数

import GlobDirective from '@/Plugins/Directive/index.js'; // 全局自定义指令

import App from './App';
import store from './store';
import router from './router';

import i18n from '@/Plugins/i18n/index.js'; // i18n

import VxeTable from './Plugins/VxeTable/index.js';

import '@/icons'; // icon
import '@/router/permission'; // permission control
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */

Vue.use(GlobFn); // 全局函数

Vue.use(ElementUI); // Element UI

Vue.use(GlobCom); // 全局组件注册

Vue.use(GlobDirective); // 全局自定义指令

Vue.use(Loading);

Vue.use(VxeTable);

Vue.config.productionTip = false;
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
});
