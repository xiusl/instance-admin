<template>
  <div style="padding: 0 32px;">
    <h3>有诗</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="列表" name="list">
    <div style="overflow-y:auto;height: calc(100vh - 260px);">
      <el-table ref="table" :data="poems" height="100%">
        <el-table-column type="index" width="40px">
        </el-table-column>
        <el-table-column prop="id" label="id" width="100px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="name" label="name" width="160px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="content" label="content" width="320px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="author" label="author" width="100px"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div style="display:flex;justify-content: space-between;margin-top:10px;">
      <el-pagination
        hide-on-single-page
        @current-change="pageChange"
        layout="prev, next"
        :total="count"
        :page-size="pageSize">
      </el-pagination>
      <div>总：{{count}}</div>
    </div>
    </el-tab-pane>
    <el-tab-pane label="作者" name="author">
     <div style="overflow-y:auto;height: calc(100vh - 260px);">
      <el-table ref="table" :data="authors" height="100%">
        <el-table-column type="index" width="40px">
        </el-table-column>
        <el-table-column prop="id" label="id" width="100px"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="name" label="name" width="160px"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div style="display:flex;justify-content: space-between;margin-top:10px;">
      <el-pagination
        hide-on-single-page
        @current-change="pageChange"
        layout="prev, next"
        :total="count"
        :page-size="pageSize">
      </el-pagination>
      <div>总：{{count}}</div>
    </div>
 
    </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PoemApi from '@/api/poem'

export default {
  name: 'Poem',
  data() {
    return {
      poems: [],
      authors: [],
      pageSize: 50,
      count: 0,
      page: 1,
      activeName: 'list',
      count2: 0,
      page2: 1
    }
  },
  mounted() {
    this.loadPoems(1, this.pageSize) 
  },
  methods: {
    loadPoems(page, count) {
      PoemApi.getPoems(page, count).then(data => {
        this.poems = data['poems']
        this.count = data['count']
      })
    },
    pageChange(page) {
      if (this.activeName == 'author') {
        this.page2 = page
        this.loadAuthors(this.page2, this.pageSize)
      } else {
        this.page = page
        this.loadPoems(page, this.pageSize)
      }
    },
    loadAuthors(page, count) {
      PoemApi.getAuthors(page, count).then(data => {
        this.authors = data['authors']
        this.count = data['count']
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
      name = tab.name
      if (name == 'author') {
        this.loadAuthors(this.page2, this.pageSize)
      } else {
        this.loadPoems(this.page, this.pageSize)
      }
    }
  }
}
</script>
