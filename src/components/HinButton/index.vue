<template>
    <!-- $attrmo是接收父组件传过来的数据(类似于props)
       $listenter获得父组件给承组件的自定义事件 -->
  <a :title="title">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
    name:'HinButton',
    props:['title']
}
</script>

<style>

</style>