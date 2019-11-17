// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.prototype.$axios = axios;
// Vue.prototype.HOST = '/api'
Vue.prototype.$qs=qs;
// Vue.prototype.$http = axios
// axios.defaults.baseURL = 'https://ronyun.com/xybz/conf'
axios.defaults.baseURL='http://localhost:8081/conf'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
});
