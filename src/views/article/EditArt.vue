<template>
  <el-dialog
    :visible.sync="visible"
    :before-close="handleClose"
    title="编辑文章">
    <el-form :model="art" label-width="64px">
      <el-form-item label="标题">
        <el-input
          v-model="art.title">
        </el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input
          v-model="art.author">
        </el-input>
      </el-form-item>
      <el-form-item style="text-align:left;">
        <el-checkbox v-model="art.is_spider">爬虫</el-checkbox>
      </el-form-item>
      <el-button @click="confirmClick">确定</el-button>
    </el-form>

  </el-dialog>
</template>

<script>
export default {
  name: 'EditArt',
  props: ['visible', 'article'],
  data() {
    return {
      art: {
        title: '',
        author: '',
        is_spider: false
      }
    }
  },
  methods: {
    getArticle(article) {
      this.art.title = article.title
      this.art.id = article.id
      this.art.is_spider = article.is_spider == 1
      this.art.author = article.author
    },
    handleClose() {
      this.$confirm('确认关闭？','提示',{
          type: 'warning'
        })
        .then(_ => {
          this.$emit('hideCallback')
        })
        .catch(_ => {})
    },
    confirmClick() {
      this.$emit('confirmCallback', this.art) 
    },
  }
}
</script>
