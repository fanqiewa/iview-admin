<template>
    <Submenu :name="`${parentName}`">
        <template slot="title">
            
        </template>
    </Submenu>
</template>

<script>
import itemMixin from './item-mixin';
export default {
  name: 'SideMenuItem',
  mixins: [ itemMixin ] //混合
}
</script>

<style scoped lang=scss>

</style>