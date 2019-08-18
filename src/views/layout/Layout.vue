<template>
  <div>
    <el-container>
      <Sidebar />
      <el-container>
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
