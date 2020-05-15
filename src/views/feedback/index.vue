<template>
<div style="padding:0 32px;">
  
  <div style="text-align:left;">
    <h3 style="margin-top:0;margin-bottom:6px;">反馈</h3>
  </div>
  <div>
    <el-table
      ref="table"
      :data="feedbacks"
      :height="tableHeight"
      style="width:100%">
      <el-table-column
        prop="user.name"
        label="Name">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="obj"
        label="关联对象"
        :show-overflow-tooltip="true"
        >
        <template slot-scope="scope">
          <a :href="scope.row.obj_url">{{scope.row.obj ? scope.row.obj.title : '' }} {{scope.row.obj ? scope.row.obj.content : ''}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="时间"
        width="120"
        :formatter='dateFormat'>
      </el-table-column>
      
      <el-table-column
        prop="status"
        width="80"
        label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status == 1 ? 'success':'primary'">{{scope.row.status == 1 ? '已回复': '未处理'}}</el-tag>
        </template> 
      </el-table-column>

      <el-table-column
        prop="replay"
        label="回复">
      </el-table-column>
    </el-table>
    <div style="display:flex;justify-content: space-between;margin-top:10px;">
        <el-pagination
        hide-on-single-page
        @current-change="pageChange"
        layout="prev, pager,next"
        :total="allcount"
        :page-size="count">
      </el-pagination>
      <div>总数：{{allcount}}</div>
    </div>
  </div>
</div>
</template>


<script>
import moment from 'moment';
import FeedbackApi from "@/api/feedback";

export default {
  name: 'feedbackindex',
  data() {
    return {
      tableHeight: null,
      page: 1,
      count: 10,
      feedbacks: [],
      allcount: 0
    }
  },
  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 125
    this.loadData()
  },
  methods: {
    loadData() {
      FeedbackApi.getFeedbacks(this.page, this.count).then(data => {
        var items = data['data']
        var ns = []
        for (var i in items) {
          var item = items[i]
          var obj_url = item['obj_url']
          if (obj_url.indexOf('article') != -1) {
            obj_url = obj_url.replace('articles', 'art')
          }
          item['obj_url'] = obj_url
          ns.push(item)
        }
        console.log(ns[0])
        this.feedbacks = items
        this.allcount = data['count']
      })
    },
    pageChange(page) {
      this.page = page
      this.loadData()
    },
    dateFormat(row, column) {
        var dateStr = row[column.property]
         if (!dateStr) return "";
        var date = new Date(dateStr)
        return moment(dateStr).format("MM-DD HH:mm")
    }
  }
}

</script>
