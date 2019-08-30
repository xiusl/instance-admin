import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/layout/Layout'

export const constantRouteMap = [
  {path: '/login', component: () => import('@/views/auth/login'), hidden: true},
  {path: '/', component: Layout},
  {
    path: '/art', 
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/article/list')
      },
      {
        path: 'source',
        component: () => import('@/views/article/source')
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouteMap
})
