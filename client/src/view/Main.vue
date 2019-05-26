<template>
    <div>
      <side-bar-menu></side-bar-menu>
      <router-view></router-view>
    </div>
</template>

<script>
  import sideBarMenu from "@/components/sideBarMenu/sideBarMenu.vue";

  export default {
    name: "Main",
    components: {
      sideBarMenu
    }
  }
</script>

<style scoped>

</style>
