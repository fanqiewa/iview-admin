import {otherRouter, appRouter} from '@/router/router';
import Cookies from 'js-cookie';
import Util from '@/libs/util';
import { getMenuByRouter } from '../../libs/utils';


const app = {
  state: {
    pageOpenedList: [{  //左侧菜单&标签列表
      title: '首页',
      path: '',
      name: 'home_index'
    }],
    menuList: [], //左侧菜单
    currentPath:[], //当前选择的面包屑数组
    openedSubmenuArr: [], // 要展开的菜单数组
    routers: [
      otherRouter,
      ...appRouter
    ]
  },
  getters: {
    menuList: (state, getters, rootState) => getMenuByRouter(appRouter, rootState.user.access)
  },
  mutations: {
    pageOpenedList(state, get) { //左侧菜单&标签列表
      console.log(state)
    },
    //更新菜单（包含所有符合条件的路由）
    updateMenulist(state) { //更新菜单
      if (!Cookies.get('access')) {
        return;
      }
      let accessCode = JSON.parse(Cookies.get('access'));
      let menuList = [];
      appRouter.forEach((item, index) => {
        if (item.access !== undefined) { //父级路由有access的情况下
          if (Util.showThisRoute(item.access, accessCode)) {
            if (item.children.length === 1) { //并且你子路由只有一个，不管你有没有设置access，都给你通过
              menuList.push(item);
              console.log(111)
            } else {
              let len = menuList.push(item);
              let childrenArr = [];
              childrenArr = item.children.filter(child => {
                if (child.access !== undefined) {
                  if (Util.showThisRoute(child.access, accessCode)) {
                    return child;
                  }
                } else {
                  return child;
                }
              });
              menuList[len - 1].children = childrenArr;
            }
          }
        } else {
          let len = menuList.push(item);//push方法返回数组push完后的长度  push父级路由
          let childrenArr = [];
          childrenArr = item.children.filter(child => {
            if (child.access !== undefined) { //当你有access的时候，并且你设置的access在cookies上有的时候，你的子路由才能返回
              if (Util.showThisRoute(child.access, accessCode)) { //当你设置了access，但是，与cookies上的不一致时，不做处理（也就是说你这个子路由不给通过）
                return child;
              }
            } else { //没设置权限
              return child;
            }
          })
          if (childrenArr === undefined || childrenArr.length === 0) { //如果没有子路由或者子路由的access不存在（也可能权限不吻合）
            menuList.splice(len - 1, 1); //就把面包屑数组的最后一位刚push进来的给剪切掉
          } else {
            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1])); //数组克隆，但是只能深层克隆第一层，后面的是浅层克隆
            handledItem.children = childrenArr;
            menuList.splice(len - 1, 1, handledItem);
          }
        }
      })
      // console.log(menuList) //拿到的是父级路由及其子路由
      state.menuList = menuList;
    },

    //设置当前选择的面包屑路径
    setCurrentPath(state, pathArr) {
      state.currentPath = pathArr;
    },

    //如果选择的菜单项存在，则不添加，如果不存在，则添加展开下拉项
    addOpenSubmenu(state, name) {
      let hasThisName = false;
      let isEmpty = false;
      if (name.length === 0) {
        isEmpty = true;
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true;
      }
      if (!hasThisName && !isEmpty) {
        state.openedSubmenuArr.push(name);
      }
    }
  }
}

export default app;


