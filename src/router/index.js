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
    component: () => import('../views/AES.vue')
  },
  {
    path: '/rsa',
    name: 'RSA',
    component: () => import('../views/RSA.vue')
  },
  {
    path: '/md-5',
    name: 'MD-5',
    component: () => import('../views/MD5.vue')
  },
  {
    path: '/sha-256',
    name: 'SHA-256',
    component: () => import('../views/SHA256.vue')
  },
  {
    path: '/404',
    component: () => import('../views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
