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
    path: '/super-encryption',
    name: 'SuperEncryption',
    component: () => import('../views/SuperEncryption.vue')
  },
  {
    path: '/aes',
    name: 'AES',
    component: () => import('../views/AES.vue')
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
    path: '/sha-3',
    name: 'SHA-3',
    component: () => import('../views/SHA3.vue')
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
