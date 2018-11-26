import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';

import App from './App.vue';
import router from './router';
import store from './store';


import 'vuetify/dist/vuetify.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import config from '../config/default.json';

Vue.use(Vuetify,  {
 iconfont: 'fa'
});

Vue.prototype.$http = axios;
Vue.prototype.$config = config;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
