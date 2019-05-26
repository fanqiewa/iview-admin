import Main from '@/view/Main.vue';


//登录路由
const loginRouter = {
  path: '/admin/login',
  name: 'login',
  mata: {
    title: 'Login - 登录'
  },
  component: () => import('@/view/login/login.vue')
}


const appRouter = [
  {
    path: '/admin/',
    icon: 'home',
    name: 'home',
    component: Main,
    children: [
      {
        path: 'home_index',
        title: '首页',
        access: ['index'],
        name: 'home_index',
        component: () => import('@/view/home/home.vue')
      }
    ]
  },
  {
    path: '/admin/',
    icon: 'social-buffer',
    name: 'activity',
    component: Main,
    children: [
      {
        path: 'activityManage',
        title: '活动管理',
        access: ['activity'],
        name: 'activityManage',
        component: () => import('@/view/activity/activityManage.vue')
      }
    ]
  },
  {
    path: '/admin/',
    icon: 'social-buffer',
    name: 'ticket',
    component: Main,
    children: [
      {
        path: 'ticketManage',
        title: '活动管理',
        access: ['ticketManage'],
        name: 'ticketManage',
        component: () => import('@/view/ticket/ticketManage.vue')
      }
    ]
  }
]

export const routers = [
  loginRouter,
  ...appRouter
]
