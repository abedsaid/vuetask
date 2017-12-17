// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import VueLocalStorage from 'vue-localstorage'

import Home from './components/home'
import Google from './components/google'

Vue.use(VueLocalStorage)
Vue.use(vueResource)

Vue.config.productionTip = false


/* eslint-disable no-new */
var vm = new Vue({
  router,
  template: '<App/>',
  components: { App, Home, Google }
}).$mount('#app')




