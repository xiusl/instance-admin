<template>
  <div class="login-bg"> 
    <div class="login-form"> 
      <h3>注册</h3>
      <el-input 
        placeholder="手机号" 
        v-model="phone" 
        style="margin-top: 10px;">
      </el-input> 
      <el-input 
        placeholder="验证码"  
        v-model="code" 
        style="margin-top:10px;">
        <el-button 
          slot="append" 
          @click="sendCode">
          验证码
        </el-button>
      </el-input>
      <el-button @click="register" type="primary" style="margin-top: 20px;" @key.enter="register">注册</el-button>
    </div>
  </div>
</template>


<script>
import UserApi from '@/api/user'

export default {
  name: 'Register',
  data() {
    return {
      loading: false,
      passwordType: 'password',
      phone: '',
      code: ''
    }
  },
  created() {
    this.keyupBind()
  },
  methods: {
    register() {
      this.loading = true
      this.$store.dispatch('LoginByPhoneCode', 
        {phone:this.phone, code: this.code})
        .then(data => {
            this.$message({message:'注册成功', type:'success'})
            this.loading = false
            this.keyupUnBind()
            this.$router.push({path: '/'})
        })
        .catch(err => {
          console.log(err)
          this.$message({message:'注册失败', type:'error'})
        })
    },
    keyupBind() {
      document.onkeydown=e=>{
        let _keyCode=window.event.keyCode
        if (_keyCode === 13) {
          this.register()
        }
      }
    },
    keyupUnBind() {
      document.onkeydown = e => {}
    },
    sendCode() {
      UserApi.getVerifyCode(this.phone).then(res => {
        console.log(res)
      }) 
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
