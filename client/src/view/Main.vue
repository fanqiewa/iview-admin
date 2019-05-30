<template>
  <div>
    <side-bar-menu></side-bar-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import sideBarMenu from "@/components/sideBarMenu/sideBarMenu.vue";
  import util from '@/libs/util.js';

  export default {
    name: "Main",
    components: {
      sideBarMenu
    },
    methods: {
      init(){
        let pathArr = util.setCurrentPath(this, this.$route.name); //获取当前存在的面包屑数组
        this.$store.commit('updateMenulist'); //填充面包屑数组
        if (pathArr.length >= 2) {
          this.$store.commit('addOpenSubmenu', pathArr[1].name);
        }
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
