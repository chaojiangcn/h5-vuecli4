import Vue from 'vue';
import VueRouter from 'vue-router';
import Device from '@utils/device';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index')
  },
  {
    path: '/loginSuccess',
    name: 'loginSuccess',
    component: () => import('../views/login/loginSuccess')
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 这里可以做页面拦截，在这里面做权限处理
  if (Device.wechat) {
    next('/loginSuccess');
  } else {
    next();
  }
});

export default router;
