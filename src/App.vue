<template>
  <div id="app">
    <router-view/>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import tabbar from './components/tabbar'

  export default {
    name: 'App',
    components:{
      tabbar
    }
  }
</script>

<style>
</style>
