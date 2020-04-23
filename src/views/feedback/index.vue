<template>
<div style="padding: 16px;">
  
  <div style="text-align:left;">  <h3>反馈</h3></div>
  <div>
    <el-table :data="feedbacks"
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
        prop="created_at"
        label="时间"
        :formatter='dateFormat'>
      </el-table-column>
      
      <el-table-column
        prop="status"
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
      page: 1,
      count: 10,
      feedbacks: [],
      allcount: 0
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      FeedbackApi.getFeedbacks(this.page, this.count).then(data => {
        this.feedbacks = data['data']
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
