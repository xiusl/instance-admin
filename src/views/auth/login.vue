<template>
  <div class="login-bg"> 
    <div class="login-form"> 
      <h3>登录</h3>
      <el-input 
        placeholder="phone" 
        v-model="phone" 
        style="margin-top: 10px;">
      </el-input> 
      <el-input 
        placeholder="password" 
        :type="passwordType" 
        v-model="password" 
        style="margin-top:10px;">
        <el-button 
          slot="append" 
          icon="el-icon-view"
          @click="showPassword">
        </el-button>
      </el-input>
      <el-button @click="login" type="primary" style="margin-top: 20px;" @key.enter="login">登录</el-button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      passwordType: 'password',
      phone: '',
      password: ''
    }
  },
  created() {
    this.keyupBind()
  },
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('LoginByPhonePwd', 
        {phone:this.phone, password:this.password})
        .then(data => {
            this.$message({message:'登录成功', type:'success'})
            this.loading = false
            this.keyupUnBind()
            this.$router.push({path: '/'})
        })
        .catch(err => {
          this.$message({message:err, type:'error'})
        })
    },
    showPassword() {
      if (this.passwordType == '') {
        this.passwordType = 'password'
      } else {
        this.passwordType = ''
      }
    },
    keyupBind() {
      document.onkeydown=e=>{
        let _keyCode=window.event.keyCode
        if (_keyCode === 13) {
          this.login()
        }
      }
    },
    keyupUnBind() {
      document.onkeydown = e => {}
    }
  }
}
</script>
<style scoped>
.login-bg {
  width:100%;
  height:100%;
  position: absolute;
  background-color:#F0F2FD;
}
.login-bg .login-form {
  background-color:#FFF;
  width: 320px;
  margin: 100px auto; 
  height: 240px;
  padding: 20px 20px;
  border-radius: 10px;
}
</style>
