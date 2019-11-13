<template>
  <div>
    <h3>Source</h3>
    <div style="text-align:left;padding: 0 32px;">
      <div>
      <el-button @click="addClick">添加</el-button>
        <div style="display:flex;">
          <el-input v-model="name" size="medium" placeholder="name"></el-input>
          <el-input v-model="url" size="medium" placeholder="url"></el-input>
          <el-input v-model="type" size="medium" placeholder="type"></el-input>
        </div>
      </div>
      <ul>
        <li v-for="data in sources" :key="data.id">
          {{data.name}}
          {{data.url}}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ArtApi from '@/api/article'
export default {
  name: 'sayIndex',
  data() {
    return {
      url: '',
      type:'',
      name: '',
      sources: []
    }
  },
  mounted() {
    ArtApi.getSources(1, 10).then(data => {
      console.log(data)
      this.sources = data["sources"]
    })
  },
  methods: {
    addClick() {
      console.log(this.url)
      var d = {
        'url': this.url,
        'type': this.type,
        'name': this.name
      }
      ArtApi.createSource(d).then(data => {
      })
    }
  }
}
</script>
