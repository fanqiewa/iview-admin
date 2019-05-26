import { routers } from '@/router/router';

const app = {
  state: {
    pageOpenedList: [{
      title: '首页',
      path: '',
      name: 'home_index'
    }]
  },
  mutations: {
    pageOpenedList(state, get) {
      console.log(state)
    }
  }
}

export default app;


