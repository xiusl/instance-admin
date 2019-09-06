<template>
  <el-dialog 
    :visible.sync="visible"
    :before-close="handleClose"
    title="Source">
    <el-form :model="formData" label-width="64px">
      <el-form-item label="Name">
        <el-input 
          v-model="formData.name" 
          autocomplete="off">
        </el-input>
      </el-form-item>
      <el-form-item label="Idf">
        <el-input
          v-model="formData.idf">
        </el-input>
      </el-form-item>
      <el-form-item label="Avatar">
        <el-input
          v-model="formData.avatar">
          <el-upload 
            ref="upload"
            action="''"
            :auto-upload="false"
            :show-file-list="false"
            :http-request="uploadIm"
            :on-change="fileChange"
            slot="append">
            <el-button 
              slot="trigger" 
              size="small" 
              type="primary">
              Upload
            </el-button>
          </el-upload>
        </el-input>
      </el-form-item>
      <el-form-item label="Type">
        <el-input
          v-model="formData.type">
        </el-input>
      </el-form-item>
      <el-form-item label="Level">
        <el-select
          v-model="formData.level">
          <el-option
            v-for="val in levels"
            :key="val"
            :label="val"
            :value="val">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Status">
        <el-select
          v-model="formData.status">
          <el-option
            v-for="val in statuses"
            :key="val"
            :label="val"
            :value="val">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="confirmClick">Confirm</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import UserApi from '@/api/user'
import { getFileMD5 } from '@/utils/upload'
import axios from 'axios'
export default {
  name: 'editSource',
  props: ['visible', 'source'],
  computed: {
  },
  data() {
    return {
      dialogVisible: this.visible,
      formData: {
        name: '',
        idf: '',
        avatar: '',
        type: '',
        level: 0,
        status: 0
      },
      levels: [0,1,2,3,4,5],
      statuses: [-1,0,1,2,3]
    }
  },
  methods: {
    handleClose() {
      this.$confirm('确认关闭？','提示',{
          type: 'warning'
        })
        .then(_ => {
          this.$emit('hideCallback')
        })
        .catch(_ => {})
    },
    confirmClick() {
      this.$emit('confirmCallback', this.formData) 
    },
    uploadIm(val) {
      console.log(val) 
    },
    fileChange(file, fileList) {
      var type = file.raw.type
      UserApi.getUploadToken(type).then(data => {
        console.log(data)
        getFileMD5(file.raw, hash => {
          console.log(hash)
          var url = 'http://shilin-1255431184.cos.ap-beijing.myqcloud.com'
          var headers = {
            'Authorization': data
          }

          let config = {headers: headers}

          var fd = new FormData()
          fd.append('key', "img/"+hash)
          fd.append('Content-Type', type)
          fd.append('file', file.raw)
          axios.post(url, fd, config).then( res => {
            var imurl = url + "/img/" + hash
            this.formData.avatar = imurl
            console.log(imurl)
          })
        })
      })
    }
  }
}
</script>
