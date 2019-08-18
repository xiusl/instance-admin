<template>
  <div class="sidebar">
    <div class="logo">
      <p style="">OneSay</p>
    </div>
    <div style="margin-top: 32px; text-align:left;padding: 0 32px;">
      <div class="item">
        Dash
      </div>
      <div class="item">
        <router-link :to="{path:'/say'}">
        Say
        </router-link>
      </div>
      <div class="item">
        <router-link :to="{path:'/art'}">
        Art
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar'
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #fff;
  box-shadow: 3px 0px 2px -2px rgba(0,0,0,0.1); 
}
.sidebar .item {
  margin-bottom: 40px;
}
.sidebar .item a {
  color: #232323;
  text-decoration: none;
}
.sidebar .item a:hover {
  color: #AFB8F2;
}
</style>
