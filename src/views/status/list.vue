<template>
  <div style="padding: 0 32px;">
    <el-table
      ref="table"
      :data="statuses"
      :height="tableHeight"
      style="width: 100%;margin-top:0px;"
      >
      <el-table-column
        type="index"
        width="40">
      </el-table-column>

      <el-table-column
        prop="content"
        label="内容"
        show-overflow-tooltip>
      </el-table-column>
      
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
            <el-image 
              :src="scope.row.images[0].url" 
              style="height:48px;" 
              fit="scale-down" 
              :preview-src-list="[scope.row.images[0].url]">
            </el-image>
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
          <el-button 
            @click="handleReportClick(scope.row)" 
            type="text" size="small">
              {{ scope.row.status == -110 ? '处理举报' : '' }}
          </el-button>
          <el-button 
            @click="handleDeleteClick(scope.row)" 
            type="text" size="small">
                {{ scope.row.status == -2 ? '恢复' : '删除'}}
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div style="display:flex;justify-content: space-between;margin-top:10px;">
      <el-pagination
        hide-on-single-page
        @current-change="pageChange"
        layout="prev, pager, next"
        :total="count"
        :page-size="pageSize">
      </el-pagination>
      <div>动态总数：{{count}}</div>
    </div>



<el-dialog title="处理举报" :visible.sync="reportFormVisible">
  <el-form :model="reportForm">
    <el-form-item label="活动名称">
      <el-input v-model="reportForm.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
        <el-input v-model="reportForm.replay" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="reportFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>

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
      editVisible: false,
      reportFormVisible: false,
      reportForm: {
        title: '',
        id: '',
        replay: ''
      }
    }
  },
  created() {
  },
  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-125;
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
      return moment(date).format("MM-DD HH:mm")
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
    handleReportClick(row) {
       this.reportFormVisible = true 
    }
  }
}
</script>
