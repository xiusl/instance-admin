<template>
  <div class="sidebar">
    <div class="logo">
      <router-link :to="{path:'/'}">
        <p style="font-weight: 500">哩嗑</p>
      </router-link>
    </div>
    <div style="margin-top: 32px; text-align:left;padding: 0 12px;">
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
        {label:'统计',value:'dashboard',path:'/dashboard'},
        {label:'一言',value:'say',path:'/say'},
        {label:'文章',value:'art',path:'/art'},
        {label:'用户',value:'users',path:'/users'},
        {label:'来源',value:'source',path:'/source'},
        {label:'有诗',value:'poem',path:'/poem'}
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
  width: 200px; 
  background-color: #fff;
  box-shadow: 3px 0px 2px -2px rgba(0,0,0,0.1); 
  min-width: 200px;
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
  line-height: 48px;  
  margin-left: 12px;
}
.sidebar .item:hover {
  color: #AFB8F2;
  background-color: #F2F4F8;
}
</style>
