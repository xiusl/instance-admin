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
        label="User"
        :formatter='idFormat'
        width=80
        >
        </el-table-column>
        <el-table-column
        prop="ip"
        label="IP">
      </el-table-column>
        <el-table-column
        prop="device_type"
        width=80
        label="Device">
      </el-table-column>
      <el-table-column
        prop="method"
        width=60
        label="Method">
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
        layout="prev, pager, next"
        :total="count"
        :page-size="pageSize">
      </el-pagination>
      <div>总数: {{count}}</div>
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
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-125;
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
             },
            idFormat(row, column) {
                var id = row[column.property]
                if (id.length <= 6) return id
                return '*'+id.substr(id.length-6, id.length)
            }
}
}
</script>
<style>
</style>
