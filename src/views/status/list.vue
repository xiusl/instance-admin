<template>
  <div style="padding: 0 32px;">
    <el-table
      ref="table"
      :data="statuses"
      :height="tableHeight"
      style="width: 100%;margin-top:20px;"
      >
      <el-table-column
        type="index"
        width="40">
      </el-table-column>
<!--      <el-table-column
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
-->
      <el-table-column
        prop="content"
        label="内容"
        width="220"
        show-overflow-tooltip>
      </el-table-column>
      </el-table-column> -->
      <el-table-column
        prop="user.name"
        label="作者"
        width="100"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="images"
        label="图片"
        width="200"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <div v-if="scope.row.images.length > 0">
            <img :src="scope.row.images[0].url" height="48px">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="发布日期"
        width="200"
        :formatter="dateFormat"
        >
      </el-table-column>
      <el-table-column
        width="160"
        label="操作"
        >
        <template slot-scope="scope">
          <el-button @click="handleDeleteClick(scope.row)" type="text" size="small">删除</el-button>
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
      <div>动态总数：{{count}}</div>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import StatusApi from '@/api/status'

export default {
  name: 'statuses',
  components: {
  },
  data() {
    return {
      type: 'weibo',
      url: '',
      count: 0,
      pageSize: 10,
      tableHeight: null,
      statuses: [],
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
    this.loadStatuses()
  },
  methods: {
    loadStatuses (){
      StatusApi.getStatuses(this.page, this.pageSize).then(data =>{
        this.count = data.count
        this.statuses = data.statuses
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
      this.loadStatuses()
    },
    handleDeleteClick(row) {
      this.$confirm('确认要删除："'+row.content+'" ?').then(_ => {
        StatusApi.deleteStatus(row.id).then(data => {
          this.$message({message:'删除成功', type: 'success'})
          this.loadStatuses()
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
