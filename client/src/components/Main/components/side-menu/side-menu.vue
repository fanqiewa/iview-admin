<template>
    <div>
      <slot></slot>
      <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-name="openedName" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
          <template v-for="item in menuList">
              <template v-if="item.children && item.children.length === 1">
                  <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
                  <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`"><common-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item.children[0]) }}</span></menu-item>
              </template>
              <template v-else>
                  <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
                  <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
              </template>
          </template>
      </Menu>
    <div v-show="collapsed" :list="menuList">
        <template v-for="item in menuList">
            
        </template>
    </div>
    </div>
</template>

<script>
    import SideMenuItem from './side-menu-item.vue'
    import mixin from './mixin'
    export default {
        components: {
            SideMenuItem
        },
        mixins: [ mixin ],
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
            return {
                
            }
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
