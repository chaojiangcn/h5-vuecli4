import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/main.less'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
