<template>
  <div class="my-header" style="height: 64px;display:flex;justify-content: space-between;">
    <div>
      <el-input v-model="keyword" class="search" placeholder="搜索"></el-input>
    </div>
    <div>
    <el-dropdown trigger="click" @command="handleCommand" size="medium" split-button>
      {{name}}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="setting">设置</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>  
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Navbar',
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleCommand(cmd) {
      if (cmd == 'logout') {
        this.logout()
      } else if (cmd == 'setting') {
        this.setting()
      }
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()
      })
    },
    setting() {
      this.$router.push({path: '/setting'})
    }
  }
}
</script>

<style scoped>
.my-header {
  text-align: left;
}
.search {
  margin-top: 5px;
  margin-left: 17px;
}
.search >>> .el-input__inner {
  height: 54px;
  width: 120px;
  background-color: transparent;
  border: none;
  border-radius: 0;
}
.el-dropdown {
  margin-right: 32px;
  margin-top: 14px;
}
.el-dropdown .el-button-group .el-button {
  background-color: #fff;
}

</style>
