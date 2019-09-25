<template>
  <div class="article-h5">
    <h3>{{article.title}}</h3>
    <div style="font-size:14px;"><span>{{article.author}} · </span><span>{{article.published_at}}</span></div>
    <div class="content">
      <p v-html="article.transcoding"></p>

      <template v-if="article.type=='weibo'">
        <div class="sudoku_row">
        <div class="sudoku_item" v-for="url in article.images" :key="url" style="text-align:center;">
          <el-image :src="url" style="width: 100px; height: 100px" :preview-src-list="article.images" lazy></el-image>
        </div>
        </div>
      </template>
    </div>
  </div>
</template>


<script>
import ArtApi from '@/api/article';
import moment from 'moment';
export default {
  name: 'articleh5',
  data() {
    return {
      id: '',
      article: {
        title: '',
        content: '',
        images: ''
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id
    this.loadArticle()
  },
  methods: {
    loadArticle() {
      ArtApi.getArticleById(this.id).then(data => {
        this.article = data
        var d = data['published_at']
        var dt = new Date(d)
        var fd = moment(dt).format("YYYY-MM-DD HH:mm:ss")
        this.article['published_at'] = fd
      })
    }
  }
}
</script>

<style>
.article-h5 {
  background: #fff;
  max-width: 548px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
  color: #1A2C3F;
}
.article-h5 h3 {
  margin-top: 0px;
  text-align: left;
}
.article-h5 .content {
  text-align: left;
}
.article-h5 .content img{
  max-width: 100% !important;
}
.article-h5 .content {
  line-height: 1.5em;
}
        .sudoku_row{
            display: flex;
            align-items: center;
            width:100%;
            flex-wrap: wrap;
        }
        .sudoku_item{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width:25%;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .opacity{
            opacity: 0.4;
            background: #e5e5e5;
        }
        .sudoku_item img{
            margin-bottom: 3px;
            display: block;
        }
</style>
