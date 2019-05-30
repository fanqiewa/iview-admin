let util = {};

util.title = title => {
  title = title || '后台管理系统';
  window.document.title = title;
}

util.openNewPage = (vm, name, params, query) => {
  // let pageOpenedList = vm.$store.state.app.pageOpenedList;
  // let openedPageLen = pageOpenedList.length;
  // let i = 0;
  // while (i < openedPageLen) {
  //   if (name === pageOpenedList[i].name) {
  //     vm.$store.commit('pageOpenedList', {
  //       index: i,
  //       params: params,
  //       query: query
  //     });
  //     break;
  //   }
  //   i++;
  // }
}

/*
* 用来判断数组中是否存在对象上的值
* */
util.oneOf = (obj, targetArr) => {
  for (let key in obj) {
    if (targetArr.indexOf(obj[key])) {
      return true;
      break;
    } else {
      return false;
    }

  }
}
/*
*用来判断当前路由的access和Cookies上的access对比，是否存在
* currentAccess为cookies上的数组 ['index','activity']
* */
util.showThisRoute = (itAccess, currentAccess) => {
  if (Array.isArray(itAccess) && Array.isArray(currentAccess)) { //当两个数组对比时
    //求两个数组的交集，并且去重
    //先去重，后交集, 再去重
    let intersectionSet = new Set([...new Set(itAccess)].filter((ele) => new Set(currentAccess).has(ele)));
    return intersectionSet.size > 0;
  } else if (typeof itAccess === 'object' && Array.isArray(currentAccess)) {  //当为对象跟数组比时
    return util.oneOf(itAccess, currentAccess);
  } else {  //当为字符串类型时
    return currentAccess.indexOf(itAccess);
  }
}

/*
*设置标题（获取路由title)
* */
util.handleTitle = function (vm, item) {
  return item.title;
};

/*
* 设置当前选择的面包屑节点
* */
util.setCurrentPath = (vm, name) => {
  let title = '';
  let isOtherRouter = false;
  console.log(vm.$store.state.app.routers)
  //遍历所有的路由，查询与name相等的路由，设置title
  vm.$store.state.app.routers.forEach(ele => {
    // console.log(ele.name)
    if (ele.children.length === 1) {
      if (ele.children[0].name === name) {
        title = util.handleTitle(vm, ele);
        if (ele.name === 'otherRouter') {
          isOtherRouter = true;
        }
      }
    } else {
      ele.children.forEach(child => {
        if (child.name === name) {
          title = util.handleTitle(vm, child);
          if (ele.name === 'otherRouter') {
            isOtherRouter = true;
          }
        }
      })
    }
  })

  let currentPathArr = [];

  //如果你是首页，那我就让你是首页，如果你不是首页，那我也把首页放在最前面
  if (name === 'home_index') {
    currentPathArr = [{
      title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
      path: '/home',
      name: 'home_index'
    }];
  } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
    currentPathArr = [{
      title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
      path: '/home',
      name: 'home_index'
    },
      {
        title: title,
        path: '',
        name: name
      }
    ];
  } else {
    let currentPathObj = vm.$store.state.app.routers.filter(item => {
      //获取所有name与实参相等的路由,即便自己没有，只要children有就ok了，就把你T出去
      if (item.children.length <= 1) {
        return item.children[0].name === name;
      } else {
        let i = 0;
        let childArr = item.children;
        let len = childArr.length;
        while (i < len) {
          if (childArr[i].name === name) { //当子路由中的name与实参相同时，也要返回当前的item
            return true;
          }
          i++;
        }
        return false;
      }
    })[0]; //[0]  ==> 获取数组中的第0项，所以currentPathObj为一个对象

    if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
      currentPathArr = [{
        title: '首页',
        path: '',
        name: 'home_index'
      }];
    } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
      //当你不是首页时，我也要把首页放在你前面，就是这么任性
      currentPathArr = [{
        title: '首页',
        path: '/home',
        name: 'home_index'
      }, {
        title: currentPathObj.title,
        path: '',
        name: name
      }];
    } else {
      //获取children中name与实参相等的子路由对象
      let childObj = currentPathObj.children.filter((child) => {
        return child.name === name;
      })[0];
      currentPathArr = [{  //首页依然要存在，且在最前面。首页 ==》到当前路由的父路由 ==》 子路由
        title: '首页',
        path: '/home',
        name: 'home_index'
      }, {
        title: currentPathObj.title,
        path: '',
        name: currentPathObj.name
      }, {
        title: childObj.title,
        path: currentPathObj.path + '/' + childObj.path,
        name: name
      }
      ];
    }
  }

  //设置store上的当前选择项的面包屑数组
  vm.$store.commit('setCurrentPath', currentPathArr);

  return currentPathArr;
}

/*
* 通过名字获取路由对象, 这个方法的意思就是，遍历所有的路由，如果当前路由的name等于你传进来的name，就返回(return) 当前路由对象
*如果当前路由对象的name与传进来name的不相等，则当前路由对象的子路由，直到有值为止
* */
util.getRouterObjByName = (routers, name) => {
  if (!name || !routers || !routers.length) {
    //递归出口 当子路由不存在时
    return null;
  }
  // debugger;
  let routerObj = null;
  for (let item of routers) {
    if (item.name === name) {
      return item;
    }
    routerObj = util.getRouterObjByName(item.children, name);
    if (routerObj) {
      return routerObj;
    }
  }
  return null;
}

export default util;
