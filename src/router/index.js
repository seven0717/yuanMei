import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      // 主页面
      path:'/home',
      component: r => require.ensure([], () => r(require('@/page/home')), 'home')
    },
    {
      // 网红
      path:'/kol',
      component: r => require.ensure([], () => r(require('@/page/kol')), 'kol')
    },
    {
      // 医生
      path:'/doctor',
      component: r => require.ensure([], () => r(require('@/page/doctor')), 'doctor')
    },
    {
      // 我的
      path:'/my',
      component: r => require.ensure([], () => r(require('@/page/my')), 'my')
    }
  ]
});

router.beforeEach((to,from, next) => {
  if (to.meta.auth){
  //  判断权限
    if ('duqulocal'){
    //  读取到。。。
      next();
    } else {
      // 没读取到。。。
      next({path:'/'})
    }
  } else {
    // 没有meta直接下一步
    next();
  }
});

export default router;
