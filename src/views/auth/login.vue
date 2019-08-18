<template>
  <div>
    <h3>Login</h3>
    <div style="background-color:#FFF;width: 320px;margin: 100px auto; height: 430px">
      <el-input placeholder="phone" v-model="phone" style="margin-top: 10px;"></el-input> 
      <el-input placeholder="password" type="password" v-model="password" style="margin-top:10px;"></el-input>
      <el-button @click="login" style="margin-top: 20px;">Login</el-button>
    </div>
  </div>
</template>


<script>
import { loginByUsername } from '@/api/auth'
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      phone: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('LoginByPhonePwd', {phone:this.phone, password:this.password}).then(data => {
        this.loading = false
        this.$router.push({path: '/'})
      })
    }
  }
}
</script>
