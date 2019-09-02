<template>
  <div class="sidebar">
    <div class="logo">
      <router-link :to="{path:'/'}">
      <p style="">OneSay</p>
      </router-link>
    </div>
    <div style="margin-top: 32px; text-align:left;padding: 0 32px;">
      <div v-for="item in navitems" :key="item.value" class="item">
        <router-link :to="{path: item.path}" :style="{color:(item.value==curitem?'#409EFF':'#232323')}">
          {{item.label}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  watch: {
    '$route.path': {
      handler: function (val, old) {
        this.updateSidebar(val)
      }
    }
  },
  mounted() {
    this.updateSidebar(this.$route.path)
  },
  data() {
    return {
      navitems: [
        {label:'Dash',value:'dashboard',path:'/dashboard'},
        {label:'Say',value:'say',path:'/say'},
        {label:'Art',value:'art',path:'/art'},
      ],
      curitem: ''
    }
  },
  methods: {
    updateSidebar(val) {
      var a = val.split('/')
      this.curitem = a[1] 
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #fff;
  box-shadow: 3px 0px 2px -2px rgba(0,0,0,0.1); 
}
.sidebar .logo a {
  color: #232323;
  text-decoration: none;
}
.sidebar .logo a:hover {
  color: #AFB8F2;
}
.sidebar .item {
  margin:0;
}
.sidebar .item a {
  color: #232323;
  text-decoration: none;
  width: 100%;
  display: block;
  height: 48px;
  
}
.sidebar .item a:hover {
  color: #AFB8F2;
}
</style>
