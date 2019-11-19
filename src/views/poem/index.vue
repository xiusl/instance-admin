<template>
  <div style="padding: 0 32px;">
    <h3>有诗</h3>
    <el-tabs v-model="activeName" @tab-click="handleClick">

    <!-- 诗文列表 -->
      <el-tab-pane label="列表" name="list">
        <div style="overflow-y:auto;height: calc(100vh - 260px);">
          <el-table ref="table" :data="poems" height="100%">
            <el-table-column type="index" width="40px"></el-table-column>
            <el-table-column prop="id" label="id" width="100px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="name" width="160px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="content" label="content" width="320px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="author" label="author" width="100px" show-overflow-tooltip></el-table-column>
            <el-table-column width="260px" show-overflow-tooltip>
              <template slot="header" prop="tags" slot-scope="scope">
                <div style="display:flex;">
                  <el-input
                    v-model="search"
                    size="mini"
                    placeholder="输入关键字搜索"
                    style="line-height:28px;"
                  ></el-input>
                  <el-button @click="searchClick()" size="mini" style="height:28px;">s</el-button>
                </div>
              </template>
              <template slot-scope="scope">
                <div>
                  <span v-for="t in scope.row.tags">{{t}},</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="display:flex;justify-content: space-between;margin-top:10px;">
          <el-pagination
            hide-on-single-page
            @current-change="pageChange"
            layout="prev, pager,next"
            :total="count"
            :page-size="pageSize"
          ></el-pagination>
          <div>总：{{count}}</div>
        </div>
      </el-tab-pane>


      <!-- 作者 -->
      <el-tab-pane label="作者" name="author">
        <div style="overflow-y:auto;height: calc(100vh - 260px);">
          <el-table ref="table" :data="authors" height="100%">
            <el-table-column type="index" width="40px"></el-table-column>
            <el-table-column prop="id" label="id" width="100px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="name" width="160px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="poems_count" label="count" width="160px" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div style="display:flex;justify-content: space-between;margin-top:10px;">
          <el-pagination
            hide-on-single-page
            @current-change="pageChange"
            layout="prev, pager, next"
            :total="count"
            :page-size="pageSize"
          ></el-pagination>
          <div>总：{{count}}</div>
        </div>
      </el-tab-pane>


      <!-- Tag -->
      <el-tab-pane label="标签" name="tag">
        <div style="height: calc(100vh - 260px);display:flex;">
          <el-table ref="table" :data="tags" height="100%">
            <el-table-column type="index" width="100px"></el-table-column>
            <el-table-column prop="id" label="id" width="100px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="name" width="160px" show-overflow-tooltip></el-table-column>
          </el-table>
          <div style="width:320px;overflow-y:auto;">
            <span v-for="t in tags">{{t.name}},</span>
          </div>
        </div>
        <div style="display:flex;justify-content: space-between;margin-top:10px;">
          <el-pagination
            hide-on-single-page
            @current-change="pageChange"
            layout="prev, pager, next"
            :total="count"
            :page-size="860"
          ></el-pagination>
          <div>总：{{count}}</div>
        </div>
      </el-tab-pane>



    </el-tabs>
  </div>
</template>

<script>
import PoemApi from "@/api/poem";

export default {
  name: "Poem",
  data() {
    return {
      poems: [],
      authors: [],
      tags:[],
      pageSize: 50,
      count: 0,
      page: 1,
      activeName: "list",
      count2: 0,
      page2: 1,
      search: ""
    };
  },
  mounted() {
    this.loadPoems(1, this.pageSize);
  },
  methods: {
    loadPoems(page, count, author = "") {
      PoemApi.getPoems(page, count, author).then(data => {
        this.poems = data["poems"];
        this.count = data["count"];
      });
    },
    pageChange(page) {
      var n = this.activeName
      if (n == "author") {
        this.page2 = page;
        this.loadAuthors(this.page2, this.pageSize);
      } else if (n == 'list'){
        this.page = page;
        this.loadPoems(page, this.pageSize, this.search);
      } else if (n == 'tag') {
        this.page = page
        this.loadTags()
      }
    },
    loadAuthors(page, count) {
      PoemApi.getAuthors(page, count).then(data => {
        this.authors = data["authors"];
        this.count = data["count"];
      });
    },
    loadTags() {
      PoemApi.getTags(1, 860).then(data => {
        this.tags = data['tags']
        this.count = data['count']
      })
    },
    handleClick(tab, event) {
      name = tab.name;
      if (name == "author") {
        this.loadAuthors(this.page2, this.pageSize);
      } else if (name=='list'){
        this.search = "";
        this.loadPoems(this.page, this.pageSize);
      } else if (name == 'tag') {
        this.loadTags()
      }
    },
    searchClick() {
      this.loadPoems(this.page, this.pageSize, this.search);
    }
  }
};
</script>
