<template>
    <Menu ref="sideMenu" active-name="1-1" :open-names="['1']" theme="dark" width="auto" @on-select="changeMenu">
      <template>
        <Submenu name="1">
          <template slot="title">
            <Icon></Icon>
            <span>首页</span>
          </template>
          <template>
            <MenuItem name="1-1">
              <Icon></Icon>
              <span>首页</span>
            </MenuItem>
          </template>
        </Submenu>
      </template>
    </Menu>
</template>

<script>
    export default {
        name: "sideBarMenu",
        props: {//需要两个数组，一个渲染项数，一个渲染展开的 Submenu 的 name 集合
          menuList: Array,//渲染菜单项数
          openNames: {
            type: Array
          },
          menuTheme: { //渲染主题颜色
            type: String,
            default: 'dark'
          },
          iconSize: Number //自定义icon的大小
        },
        methods: {
          changeMenu (active) {
            //on-select 选择菜单（MenuItem)时触发，active为MenuItem的name值！！
            console.log(active)
          }
        }
    }
</script>

<style scoped>

</style>
