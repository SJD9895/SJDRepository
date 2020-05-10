// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// eslint-disable-next-line import/first
import ElementUI from 'element-ui';
// eslint-disable-next-line import/first
import 'element-ui/lib/theme-chalk/index.css';


// eslint-disable-next-line import/first
import vuex from 'vuex';
// eslint-disable-next-line no-unused-vars,import/first
import axios from 'axios';
// eslint-disable-next-line no-unused-vars,import/first
import VueAxios from 'vue-axios';
// eslint-disable-next-line no-unused-vars,import/first
import VueCookies from 'vue-cookies';

// eslint-disable-next-line no-unused-vars,import/first
import VueI18n from 'vue-i18n';


Vue.use(VueI18n);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(vuex);
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
/* eslint-disable no-new */

Vue.prototype.HOME = 'http://localhost:8081/anterior';
// eslint-disable-next-line no-unused-vars,vars-on-top
const store = new vuex.Store({// store对象
  state: {
    adminInfo: {},
    ServerDomain: 'http://localhost:8081',
    orderCount: '',
    domain: 'localhost:8081',
    repairFormPath: 'localhost:8081/SubmitRepair',
    uploadImagePath: '/api/orders/uploadImage',
  },
});

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    // eslint-disable-next-line global-require
    zh: require('./static/lang/zh'),
  },
});

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>',
});

