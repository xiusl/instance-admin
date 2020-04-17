<template>
  <div class="user-list" style="padding: 0 32px;">
    <h3>123</h3>
    <div>
        <el-table
      :data="users"
      style="width: 100%">
        <el-table-column
        prop="avatar"
        label="头像"
        width="100"
        >
            <template slot-scope="scope">
                <el-avatar size='32' :src="scope.row.avatar"></el-avatar>
            </template>
        </el-table-column>
        <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
        <el-table-column
        prop="desc"
        label="Desc">
      </el-table-column>
      <el-table-column
        prop="type"
        label="Type">
    </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import UserApi from '@/api/user'

export default {
  name: 'users',
  data() {
    return {
      users: []
    }
  },
  mounted() {
    UserApi.getUsers(1, 10).then(data =>{
      this.users = data['users']
    })
  }
}
</script>
<style>
.user-list p {
  margin: 0;
}
</style>
