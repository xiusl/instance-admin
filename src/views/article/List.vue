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
        <template slot-scope="scope">
          <router-link :to="{path:'/art/'+scope.row.id}">
            {{scope.row.id}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="title"
        width="220"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link :to="{path:'/articles/'+scope.row.id}" target="_blank">
            {{scope.row.title}}
          </router-link>
        </template>
      </el-table-column>
      <!--
      <el-table-column
        prop="content"
        label="content"
        width="200"
        show-overflow-tooltip>
      </el-table-column> -->
      <el-table-column
        prop="author"
        label="author"
        width="100"
        show-overflow-tooltip>
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
        width="140"
        label="Actions"
        >
        <template slot-scope="scope">
          <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">delete</el-button>
          <el-button @click="handleEditClick(scope.row)" type="text" size="small">editCon</el-button>
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
import ArtApi from '@/api/article'

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
        },
        {
          value: 'kr36',
          label: '36氪'
        },
        {
          value: 'laohu',
          label: '老虎证券'
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
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-180;
    ArtApi.getArticles(1, this.pageSize).then(data =>{
      this.count = data['count']
      this.article = data['articles']
    })
  },
  methods: {
    loadArticles (){
      ArtApi.getArticles(this.page, this.pageSize).then(data =>{
        this.count = data.count
        this.article = data.articles
      })
    },
    add() {
      if (this.url.length == 0) {
        this.$message({message:'Need URL', type:'error'})
        return 
      }
      ArtApi.spiderWeiboByUrl(this.url, this.type).then(data => {
        this.getWeibo()
      })
    },
    getWeibo() {
      ArtApi.getWeiboByUrl(this.url).then(data => {
        this.article.splice(0, 0, data)
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
      this.page = page
      this.loadArticles()
    },
    handleDeleteClick(row) {
      this.$confirm('确认要删除："'+row.title+'" ?').then(_ => {
        ArtApi.deleteArticle(row.id).then(data => {
          this.$message({message:'删除成功', type:'success'}) 
          this.loadArticles()
        }) 
      })
    },
    handleEditClick(row) {
      this.$router.push({path:'art/'+ row.id+'/editcontent'})
    },
    tabClick(tab, event) {
      if (tab.name == 'source') {
        this.$router.push({path: '/art/source'})
      }
    }
  }
}
</script>
