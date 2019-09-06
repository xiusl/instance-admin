<template>
  <div style="padding:0 32px;">
    Setting
    <div class="info">
      <table class="info-table">
        <tr>
          <td>Avatar</td>
          <td><el-avatar :src="user.avatar"></el-avatar></td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{{user.name}}</td>
        </tr>
        <tr>
          <td>Desc</td>
          <td>{{user.desc?user.desc:"Null"}}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{user.email?user.email:"Null"}}
            <el-button @click="emailChangeClick">Change</el-button>
          </td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>{{user.phone}}</td>
        </tr>
        <tr>
          <td>Level</td>
          <td>{{user.level}}</td>
        </tr>
      </table>
      <el-button @click="editUserClick">Edit</el-button>
    </div>

    <el-dialog :visible.sync="editVisible" title="Edit">
      <div class="form-edit">
        <el-form ref="form" :model="user" label-width="80px">
          <el-form-item label="Avatar">
            <el-input v-model="user.avatar">
              <el-avatar slot="prepend" class="form-avatar" :src="user.avatar">
              </el-avatar>
              <el-upload
                ref="upload"
                action="''"
                :auto-upload="false"
                :show-file-list="false"
                :http-request="uploadImage"
                :on-change="fileChange"
                slot="append">
                <el-button
                  slot="trigger"
                  size="samll"
                  type="primary">
                  Upload
                </el-button>
              </el-upload>
            </el-input>
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="user.name" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="Desc">
            <el-input v-model="user.desc" clearable>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button @click="editConfirmClick">Confirm</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="emailVisible" title="Change Email">
      <div>
        <el-form :model="user" label-width="88px">
          <el-form-item label="New Email">
            <el-input v-model="user.email">
              <el-button slot="append" @click="sendCodeClick">Send Code</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="Code">
            <el-input v-model="code"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="emailConfirmClick">Confirm</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserApi from '@/api/user';
import { uploadImage } from '@/utils/upload';

export default {
  name: 'setting',
  data() {
    return {
      user: {},
      editVisible: false,
      emailVisible: false,
      code: ''
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      UserApi.getCurrentUser().then(data => {
        this.user = data
      })
    },
    editUserClick() {
      this.editVisible = true
    },
    uploadImage(val) {
      console.log(val)
    
    },
    fileChange(file, fileList) {
      let type = file.raw.type
      getUploadToken(type).then(data => {
        uploadImage(file.raw, data, imUrl => {
          this.user.avatar = imUrl
        })
      })
    },
    editConfirmClick() {
      UserApi.editUser(this.user.id, this.user).then(data => {
        this.$message({message:'Edit success',type:'success'})
        this.editVisible = false
        this.$store.commit('SET_NAME', data.name)
      })
    },
    emailChangeClick() {
      this.emailVisible = true
    },
    emailConfirmClick() {
      UserApi.editUserEmail(this.user.id, this.user.email, this.code).then(data => {
        this.$message({message:'Email Change Success',type:'success'})
        this.emailVisible = false
      }) 
    },
    sendCodeClick() {
      UserApi.getVerifyCode(this.user.email).then(data => {
        this.$message({message:'Send Email Code Success',type:'success'}) 
      }).catch(err => {
        this.$message({message:err.error,type:'error'})
      }) 
    }
  }
}
</script>

<style scoped>
.info { 
  background-color: #FFF;
  border-radius: 10px;
  padding-bottom: 20px;
}
.info-table {
  margin-top: 32px;
  padding: 20px;
  width: 100%;
}
.info-table tr {
  height: 40px;
}
.info-table tr td:first-child {
  text-align: right;
  color: #333;
  font-weight: bold;
  width: 80px;
}
</style>

<style>
.form-edit .el-input-group__prepend {
  padding:0 10px;
}
.form-edit .form-avatar {
  width:30px;
  height:30px;
  line-height: 30px;
}
.form-edit .el-form-item__label {
  font-weight: bold;
}
</style>
