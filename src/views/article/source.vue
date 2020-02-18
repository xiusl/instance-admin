<template>
  <div style="padding: 0 32px;text-align:left;">
    <div style="display:flex;">
      <el-tabs v-model="activeTab" @tab-click="tabClick">
        <el-tab-pane label="列表" name="list"></el-tab-pane>
        <el-tab-pane label="来源" name="source"></el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <el-button @click="addSourceClick">添加</el-button>
    </div>
    <EditSource 
      :visible="editVisible" 
      @hideCallback="editHideHandle"
      @confirmCallback="editConfirmHandle"/>
  </div>
</template>
<script>
import EditSource from './EditSource';

export default {
  name: 'articleSource',
  components: {
    EditSource
  },
  data() {
    return {
      editVisible: false,
      activeTab: 'source'
    }
  },
  methods: {
    addSourceClick() {
      console.log('bbb')
      this.editVisible = true
    },
    editHideHandle() {
      console.log("123")
      this.editVisible = false
    },
    editConfirmHandle(val) {
      console.log(val)
    
    },
    tabClick(tab, event) {
      if (tab.name == 'list') {
        this.$router.push({path: '/art'})
      }
    }
  }

}
</script>
