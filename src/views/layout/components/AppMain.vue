<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </section>
</template>

<script>
export default {
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
