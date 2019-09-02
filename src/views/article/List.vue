<template>
  <div style="padding: 0 32px;">
    <div style="display:flex;">
      <el-tabs v-model="activeTab" @tab-click="tabClick">
        <el-tab-pane label="List" name="list"></el-tab-pane>
        <el-tab-pane label="Source" name="source"></el-tab-pane>
      </el-tabs>
    </div>
    <div style="text-align:left">
      <el-input v-model="url" placeholder="url" style="width:480px;"></el-input>
      <el-select v-model="type" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
      </el-select>
      <el-button @click="add">Add</el-button>
    </div>
    <el-table
      ref="table"
      :data="article"
      :height="tableHeight"
      style="width: 100%;margin-top:20px;"
      >
      <el-table-column
        type="index"
        width="30">
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="title"
        label="title"
        width="220"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="content"
        label="content"
        width="200"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="author"
        label="author"
        width="100">
      </el-table-column>
      <el-table-column
        prop="type"
        label="type"
        width="80">
      </el-table-column>
      <el-table-column
        prop="published_at"
        label="pub_at"
        width="200"
        :formatter="dateFormat"
        >
      </el-table-column>
      <el-table-column
        label="images">
        <template slot-scope="scope">
          <img height="60" :src="scope.row.images[0]">
     <!--     <template v-for="im in scope.row.images">
            <img height="60" :src="im">
     </template> -->
        </template>
      </el-table-column>
      <el-table-column
        width="80"
        label="Actions"
        >
        <template slot-scope="scope">
          <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">delete</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div style="text-align:left;margin-top:10px;">
      <el-pagination
        hide-on-single-page
        @current-change="pageChange"
        layout="prev, pager, next"
        :total="count"
        :page-size="pageSize">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { deleteArticle, getArticles, getWeiboByUrl, spiderWeiboByUrl } from '@/api/article';

export default {
  name: 'articleList',
  data() {
    return {
      options: [
        {
          value: 'weibo',
          label: '微博'
        },
        {
          value: 'wechat',
          label: '微信'
        }
      ],
      type: 'weibo',
      url: '',
      count: 0,
      pageSize: 10,
      tableHeight: null,
      article: [],
      activeTab: "list"
    }
  },
  created() {
  },
  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-120;
    getArticles(1, this.pageSize).then(data =>{
      this.count = data['count']
      this.article = data['articles']
    })
  },
  methods: {
    loadArticles (){
      getArticles(1, this.pageSize).then(data =>{
        this.count = data.count
        this.article = data.articles
      })
    },
    add() {
      console.log(this.url)
      spiderWeiboByUrl(this.url, this.type).then(data => {
        this.getWeibo()
      })
    },
    getWeibo() {
      getWeiboByUrl(this.url).then(data => {
        this.article.push(data)
      }).catch(err => {
        setTimeout(() => {
          this.getWeibo()
        }, 2000)
      })
    },
    dateFormat(row, column) {
      var dateStr = row[column.property]
      if (!dateStr) return "";
      var date = new Date(dateStr)
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    },
    pageChange(page) {
      getArticles(page, this.pageSize).then(data => {
        this.article = data['articles']
      }) 
    },
    handleDeleteClick(row) {
      console.log(row)
      this.$confirm('确认要删除："'+row.title+'" ?').then(_ => {
        deleteArticle(row.id).then(data => {
          this.$message({message:'删除成功', type:'success'}) 
          this.loadArticles()
        }) 
      })
    },
    tabClick(tab, event) {
      console.log(tab.name) 
      if (tab.name == 'source') {
        this.$router.push({path: '/art/source'})
      }
    }
  }
}
</script>
