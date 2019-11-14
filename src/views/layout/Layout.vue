<template>
  <div>
    <el-container>
      <Sidebar />
      <el-container direction="vertical" class="my-container">
        <Navbar />

        <el-main>
          <app-main></app-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Sidebar, Navbar, AppMain } from './components'
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
}
</script>

<style>
.my-container .el-main {
  padding: 0;
}
</style>
