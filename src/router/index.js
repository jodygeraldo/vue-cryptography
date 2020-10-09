import Vue from 'vue'
import VueRouter from 'vue-router'
import Classic from '../views/Classic.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Classic',
    component: Classic
  },
  {
    path: '/aes',
    name: 'AES',
    component: () => import(/* webpackChunkName: "aes" */ '../views/AES.vue')
  },
  {
    path: '/rsa',
    name: 'RSA',
    component: () => import(/* webpackChunkName: "rsa" */ '../views/RSA.vue')
  },
  {
    path: '/md',
    name: 'MD',
    component: () => import(/* webpackChunkName: "md" */ '../views/MD.vue')
  },
  {
    path: '/sha',
    name: 'SHA',
    component: () => import(/* webpackChunkName: "sha" */ '../views/SHA.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
