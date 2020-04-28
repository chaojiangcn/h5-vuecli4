import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index')
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('../views/me'),
    children: [
      {
        path: 'largeImageLoad',
        component: () => import('../components/largeImageLoad')
      }
    ]
  },
  {
    path: '/loginSuccess',
    name: 'loginSuccess',
    component: () => import('../views/login/loginSuccess')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next({
      name: 'login' // 跳转到homeName页
    })
  } else {
    next()
  }
})

export default router
