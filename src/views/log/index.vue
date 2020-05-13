<template>
  <div style="padding: 0 32px;">
    <h3 style="margin-top:0;margin-bottom:6px;text-align:left;">API日志</h3>
    <div>    
    <el-table 
        ref="table" 
        :data="logData" 
        :height="tableHeight"
        style="width: 100%;">
        <el-table-column
        prop="user_id"
        label="User">
        </el-table-column>
        <el-table-column
        prop="ip"
        label="IP">
      </el-table-column>
        <el-table-column
        prop="device_type"
        label="Device">
      </el-table-column>
      <el-table-column
        prop="path"
        label="Path">
    </el-table-column>
        <el-table-column prop="created_at" label="Time">
        </el-table-column>
      </el-table>
     <div style="display:flex;justify-content: space-between;margin-top:10px;">
      <el-pagination
        @current-change="pageChange"
        layout="prev, next"
        :total="count"
        :page-size="pageSize">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
import UserApi from '@/api/user';

export default {
  name: 'logs',
  data() {
    return {
      logData: [],
      page: 1,
      pageSize: 10,
      count: 0,
      tableHeight: null
    }
  },
  mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-180;
    this.loadData()
  },
    methods: {
    loadData() {
        var that = this
        UserApi.getLogs(this.page, this.pageSize).then(data =>{
            that.logData = data['logs']
            that.count = data['count']
        })
    },
             pageChange(page) {
        this.page = page
        this.loadData()
             }
}
}
</script>
<style>
</style>
