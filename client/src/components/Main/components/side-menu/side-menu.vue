<template>
    <div>
      <slot></slot>
      <Menu ref="menu" v-bind="!collapsed" :active-name="activeName" :open-name="openedName" :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect">
          123
      </Menu>
    </div>
</template>

<script>
    export default {
        name: "side-menu",
        props: {
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
