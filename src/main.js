import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import Notifications from 'vue-notification'
import velocity from 'velocity-animate'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'intersection-observer'

Vue.use(Notifications, { velocity })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
