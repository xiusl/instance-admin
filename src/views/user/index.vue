<template>
  <div class="user-list" style="padding: 0 32px;">
    <h3>123</h3>
    <div style="text-align:left;">
    <div v-for="u in users">
      <img :src="u.avatar" style="width: 48px; height: 48px; float: left;border-radius: 50%;">
      <p style="margin-left: 64px;margin-top:2px;">{{u.name}}</p>
      <p style="margin-left: 64px;margin-top:2px;">{{u.desc}}</p>
    </div>
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
