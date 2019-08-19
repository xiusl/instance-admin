<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang='scss'>
@import './styles/font.css';

#app {
  font-family: 'PTMono', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F0F2FD;
  text-align: center;
  color: #2c3e50;
}
</style>
