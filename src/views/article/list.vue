<template>
  <div style="padding: 0 32px;">
    <div style="display:flex;">
      <el-tabs v-model="activeTab" @tab-click="tabClick">
        <el-tab-pane label="列表" name="list"></el-tab-pane>
        <el-tab-pane label="来源" name="source"></el-tab-pane>
      </el-tabs>
    </div>
    <div style="text-align:left">
      <el-input v-model="url" placeholder="url" style="width:480px;"></el-input>
      <el-button @click="add">添加</el-button>
    </div>
    <el-table
      ref="table"
      :data="article"
      :height="tableHeight"
      style="width: 100%;margin-top:20px;"
      >
      <el-table-column
        type="index"
        width="40">
      </el-table-column>
      <el-table-column
        prop="id"
        label="id"
        width="80"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <router-link :to="{path:'/art/'+scope.row.id}">
            {{scope.row.id}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
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
        label="作者"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="is_spider"
        label="标签"
        style="font-size:10px;"
        >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.is_spider == 1 ? 'primary' : 'success'"
            disable-transitions>{{scope.row.is_spider == 1 ? '爬虫' : '投稿'}}</el-tag>
          <el-tag :type="scope.row.status == 0 ? 'success' : 'primary'" disable-transitions>{{scope.row.status == 0 ? '显示' : '不显示'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
          <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">不展示</el-button>
          <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑内容</el-button>
          <el-button @click="handleEdit2Click(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div style="display:flex;justify-content: space-between;margin-top:10px;">
      <el-pagination
        hide-on-single-page
        @current-change="pageChange"
        layout="prev, next"
        :total="count"
        :page-size="pageSize">
      </el-pagination>
      <div>文章总数：{{count}}</div>
    </div>
    <EditArt
      :visible="editVisible"
      ref="addAlert"
      @hideCallback="editHideHandle"
      @confirmCallback="editConfirmHandle" />

  </div>
</template>

<script>
import moment from 'moment';
import ArtApi from '@/api/article'
import EditArt from './EditArt';

export default {
  name: 'articleList',
  components: {
    EditArt
  },
  data() {
    return {
      type: 'weibo',
      url: '',
      count: 0,
      pageSize: 10,
      tableHeight: null,
      article: [],
      activeTab: "list",
      cursor: '',
      direction: 1,
      editVisible: false
    }
  },
  created() {
  },
  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-180;
    this.loadArticles()
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
      ArtApi.spiderByUrl(this.url).then(data => {
        this.watchArticle()
      })
    },
    watchArticle() {
      ArtApi.getTmpArticleByUrl(this.url).then(data => {
        if (data.ok === 2) {
          this.page = 1
          this.loadArticles()
        } else {
          setTimeout(() => {
          this.watchArticle()
        }, 3000)
        }
      }).catch(err => {
        setTimeout(() => {
          this.watchArticle()
        }, 3000)
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
    },
    handleEdit2Click(row) {
      this.$refs.addAlert.getArticle(row)
      this.editVisible = true
    },
    editHideHandle() {
      this.editVisible = false
    },
    editConfirmHandle(val) {
      this.editVisible = false
      var d = {
        'title': val['title'],
        'author': val['author'],
        'spider': val['is_spider'] ? 1 : 0
      }
      ArtApi.editContent(val['id'], d).then(data => {
        this.$message({message:'编辑成功', type:'success'})
      })
    }
  }
}
</script>

<style>
.el-table__body {
    width: 100%;
    table-layout: fixed !important;
}

</style>
