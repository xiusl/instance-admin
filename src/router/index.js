import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// import Layout from '@/views/layout/Layout'

export const constantRouteMap = [
  {path: '/login', component: () => import('@/views/auth/login'), hidden: true}
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouteMap
})
