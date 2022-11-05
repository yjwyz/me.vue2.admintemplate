import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Zh from './module/zh.js';
import En from './module/en.js';
Vue.use(VueI18n);
const messages = {
  en: {
    ...En
  },
  zh: {
    ...Zh
  }
};

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages // set locale messages
});

export default i18n;
