<template>
  <div class="article-h5">
    <h3>{{article.title}}</h3>
    <div style="font-size:14px;" v-if="article.title.length > 0"><span>{{article.author + ' · '}}</span><span>{{article.published_at}}</span></div>
    <div class="content">
      <p v-html="article.transcoding" style="text-align:justify;"></p>

      <template v-if="article.type=='weibo'">
        <div class="sudoku_row1">
        <div class="sudoku_item1" v-for="url in article.images" :key="url" style="text-align:center;">
          <el-image :src="url" :preview-src-list="article.images" lazy></el-image>
        </div>
        </div>
      </template>
      <p v-if="article.title.length > 0" style="text-align:center;font-size:10px;color:#A5A2A1">文章已转码，<a style="color:#A5A2A1;" :href="article.original_url" target="_block">原文链接</a></p>
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
        document.title = data['title']
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
  word-wrap: break-word!important;
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
pre p {
  margin: 0;
}
</style>
