<template>
  <div>
    <h3>List</h3>
    <el-input v-model="url" placeholder="url"></el-input>
    <el-button @click="add">Add</el-button>
  </div>
</template>

<script>
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
    }
  }
}
</script>
