<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" class="left-sider"  v-model="collapsed" :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menuList="menuList">

      </side-menu>
    </Sider>
    <router-view></router-view>
  </Layout>
</template>

<script>
  import SideMenu from './components/side-menu'
  import util from '@/libs/util.js'

  export default {
    name: "Main",
    data () {
      return {           
        collapsed: false
      }
    },
    computed: {
        menuList () {
          return this.$store.getters.menuList
        }
    },
    components: {
        SideMenu
    },
    methods: {
      init(){
        // let pathArr = util.setCurrentPath(this, this.$route.name); //获取当前存在的面包屑数组
        // this.$store.commit('updateMenulist'); //填充面包屑数组
        // if (pathArr.length >= 2) {
        //   this.$store.commit('addOpenSubmenu', pathArr[1].name);
        // }
      },
      turnToPage(route) {
        let { name, params, query } = {}
        if (typeof route === 'string') name = route
        else {
          name = route.name
          params = route.params
          query = route.query
        }
        if (name.indexOf('isTurnByHref_') > -1) {
          window.open(name.split('_')[1])
          return
        }
         this.$router.push({
          name,
          params,
          query
        })
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style lang="less">
  @import './main.less';
</style>
