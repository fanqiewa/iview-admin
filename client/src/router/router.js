import Main from '@/components/Main/Main.vue';


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
    // icon: 'home',
    name: 'home',
    // access: 'index',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'home_index',
        title: '首页',
        name: 'home_index',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '首页'
        },
        component: () => import('@/view/home/home.vue')
      },
      {
        path: 'home_index',
        title: '首页',
        name: 'name',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '首页'
        },
        component: () => import('@/view/home/home.vue')
      },
      {
        path: 'activityManage',
        name: 'activityManage',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '活动展示'
        },
        component: () => import('@/view/activity/activityManage.vue')
      },
      {
        path: 'activityManage',
        name: 'activityManage2',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '活动展示'
        },
        component: () => import('@/view/activity/activityManage.vue')
      }
    ]
  },
  {
    path: '/admin/',
    name: 'admin',
    component: Main,
    children: [
      {
        path: 'activityManage',
        name: 'activityManage',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '活动展示'
        },
        component: () => import('@/view/activity/activityManage.vue')
      }
    ]
  },
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
