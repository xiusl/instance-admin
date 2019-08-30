<template>
  <el-dialog 
    :visible.sync="visible"
    :before-close="handleClose">
    <el-form :model="formData">
      <el-form-item label="Source Name">
        <el-input v-model="formData.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'editSource',
  props: ['visible', 'source'],
  computed: {
  },
  data() {
    return {
      dialogVisible: this.visible,
      formData: {
        name: ''
      }
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
    }
  }
}
</script>
