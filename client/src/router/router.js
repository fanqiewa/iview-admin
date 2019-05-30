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


export const appRouter = [
  {
    path: '/admin/',
    icon: 'home',
    name: 'home',
    access: 'index',
    component: Main,
    children: [
      {
        path: 'home_index',
        title: '首页',
        access: ['aaa'],
        name: 'home_index',
        component: () => import('@/view/home/home.vue')
      },
      {
        path: 'home_index',
        title: '首页2',
        name: 'name',
        component: () => import('@/view/home/home.vue')
      }
    ]
  },
  {
    path: '/admin/',
    icon: 'social-buffer',
    name: '活动管理',
    component: Main,
    children: [
      {
        path: 'activityManage',
        title: '活动展示',
        access: ['activity'],
        name: 'activityManage',
        component: () => import('@/view/activity/activityManage.vue')
      }
    ]
  },
  {
    path: '/admin/',
    icon: 'social-buffer',
    name: '票劵管理',
    component: Main,
    children: [
      {
        path: 'ticketManage',
        title: '票劵列表',
        access: ['ticketManage'],
        name: 'ticketManage',
        component: () => import('@/view/ticket/ticketManage.vue')
      },
      {
        path: 'ticketManagea',
        title: '票劵审核',
        name: 'ticketManage',
        component: () => import('@/view/ticket/ticketManage.vue')
      }
    ]
  }
]

export const otherRouter = {
  path: '/admin/',
  name: 'otherRouter',
  component: Main,
  children: [{
    path: 'updateAdmin',
    title: '编辑管理员',
    access: ['system'],
    name: 'updateAdmin',
    component: () =>
      import ('@/view/ticket/ticketManage.vue')
  },
    {
      path: 'editActivity',
      title: '编辑活动',
      access: ['activity'],
      name: 'editActivity',
      component: () =>
        import ('@/view/ticket/ticketManage.vue')
    }
    ]

}


export const routers = [
  loginRouter,
  otherRouter,
  ...appRouter
]
