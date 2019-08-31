<template>
  <div style="padding: 0 20px;text-align:left;">
    <div style="display:flex;">
      <h3 style="margin-top:0px;">Source</h3>
      <router-link to="/art" style="margin-left:30px;">List</router-link>
    </div>
    <div>
      <el-button @click="addSourceClick">Add</el-button>
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
      editVisible: false 
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
    
    }
  }

}
</script>
