import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入axios
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'

//使用axios
Vue.use(ElementUI);
//使用axios
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
