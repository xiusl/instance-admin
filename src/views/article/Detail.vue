<template>
  <div style="padding:0 32px;">
  <div>
    <el-page-header @back="goBack" :content="article.title">
    </el-page-header>
  </div>
  <h3>{{article.title}}</h3>
  <div style="width:800px;overflow:auto;margin:20px auto;text-align:left;" :style="{height:textHeight}">
    <p v-html="article.transcoding"></p>
    <template v-if="article.type=='weibo'">
    <div v-for="url in article.images" :key="url" style="text-align:center;">
      <el-image :src="url" :preview-src-list="article.images" lazy></el-image>
    </div>
    </template>
  </div>
  </div>
</template>
<script>
import ArtApi from '@/api/article';

export default {
  name: 'articleDetail',
  data() {
    return {
      id: '',
      article: {
        title: '',
        content:'',
        images: '',
      },
      textHeight: window.innerHeight-160+'px'
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
      })
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>
<style>
 ::-webkit-scrollbar {
     width: 0 !important;
   }
   ::-webkit-scrollbar {
     width: 0 !important;height: 0;
   }
.code-snippet__fix {
      max-width: 1000%!important;
    font-size: 14px;
    margin: 10px 0;
    display: block;
    color: #333;
    position: relative;
    background-color: rgba(0,0,0,0.03);
    border: 1px solid #f0f0f0;
    border-radius: 2px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    line-height: 26px;
}
.code-snippet__fix .code-snippet__line-index {
    counter-reset: line;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    height: 100%;
    padding: 1em;
    list-style-type: none;
}
.code-snippet__fix pre {
    overflow-x: auto;
    padding: 1em;
    padding-left: 0;
    white-space: normal;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    -webkit-overflow-scrolling: touch;
}
.rich_media_content {
    overflow: hidden;
    color: #333;
    font-size: 17px;
    line-height: 1.75em;
    word-wrap: break-word;
    -webkit-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
    text-align: justify;
    position: relative;
    z-index: 0;
}
.rich_media_content * {
    max-width: 100%!important;
    box-sizing: border-box!important;
    -webkit-box-sizing: border-box!important;
    word-wrap: break-word!important;
}
.code-snippet__fix code {
    text-align: left;
    font-size: 14px;
    display: block;
    white-space: pre;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: relative;
    font-family: Consolas,"Liberation Mono",Menlo,Courier,monospace;
}
</style>
