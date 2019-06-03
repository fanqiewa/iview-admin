import Vue from 'vue';
import iView from 'iview';
import Router from 'vue-router';
import {routers} from './router.js';
import Cookies from 'js-cookie';
import Util from '../libs/util';

//使用路由
Vue.use(Router)

//配置路由
const RouterConfig = {
  mode: 'history',
  routes: routers
}

export const router = new Router(RouterConfig);
//至此，main.js中使用的router已配置成功
// console.log(router.app) //null 拿不到Vue实例，因为Vue还没有挂载成功
//以下操作是为了在路由跳转的时候，配置的一些拦截器，重定向等。
// 只要有new Vue中添加了router,不管路由有没有跳过去，都会执行beforeEach导航钩子函数
// router.beforeEach((to, from, next) => {
//   //console.log(router.app.$store) //拿到Vue实例，因为到此阶段，$store还没有挂载成功

//   iView.LoadingBar.start();
//   //判断有没有登录且前往的不是登录界面
//   if (!Cookies.get('user') && to.name !== 'login') {
//     next({
//       name: 'login'
//     });
//   } else if (Cookies.get('user') && to.name === 'login') {
//     Util.title();
//     next({
//       name: 'home_index'
//     })
//   }
//   next();
// })

//afterEach导航钩子函数，当路由跳转完成时执行

router.afterEach( (to, from) => {
  //console.log(router.app.$store) //拿到Vue实例，因为到此阶段，$store已经成功挂载
  Util.openNewPage(router.app, to.name, to.params, to.query);//打开页面导航
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
})


