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


export default util;
