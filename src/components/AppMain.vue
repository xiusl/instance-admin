<template>
  <div class="app-main">
    <transtion name="fade-transform" mode="out-in">
      <router-view :key="key"></route-view>
    </transtion>
  </div>
</template>

<script>
export defalut {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullpath
    }
  }
}
</script>

<style>
.app-main {
  /* navbar: 64px */
  height: calc(100vh - 64px);
  position: relative;
  overflow: hidden;
}
</style>
