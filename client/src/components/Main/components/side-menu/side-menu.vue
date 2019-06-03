<template>
    <div>
      <slot></slot>
      <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-name="openedName" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
          <template v-for="item in menuList">
              <template v-if="item.children && item.children.length === 1">
                  
              </template>
          </template>
      </Menu>
    </div>
</template>

<script>
    export default {
        name: "side-menu",
        props: {
            menuList: {
                type: Array,
                default () {
                    return []
                }
            },
            collapsed: {
                type: Boolean
            },
            activeName: {
                type: String,
                default: ''
            },
            openedName: {
                type: Array,
                default: () => []
            },
            accordion: Boolean,
            theme: {
                type: String,
                default: 'dark'
            },
        },
        data () {

        },
        methods: {
            handleSelect(name) {
                this.$emit('on-select', name)
            }
        }
    }
</script>

<style scoped>

</style>
