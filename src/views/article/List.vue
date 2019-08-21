<template>
  <div>
    <h3>List</h3>
    <el-input v-model="url" placeholder="url"></el-input>
    <el-button @click="add">Add</el-button>
  </div>
</template>

<script>
import { getWeiboByUrl, spiderWeiboByUrl } from '@/api/article';

export default {
  name: 'articleList',
  data() {
    return {
      url: ''
    }
  },
  methods: {
    add() {
      console.log(this.url)
      spiderWeiboByUrl(this.url).then(data => {
        console.log(data)
        this.getWeibo()
      })
    },
    getWeibo() {
      getWeiboByUrl(this.url).then(data => {
        console.log(data)
      }).catch(err => {
        setTimeout(() => {
          this.getWeibo()
        }, 2000)
      })
    }
  }
}
</script>
