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
      },
      {
        path: ':id',
        component: () => import('@/views/article/detail')
      }
    ]
  },
  {
    path: '/say',
    component: Layout,
    children: [
      {path: '', component: () => import('@/views/say/index')}
    ]
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {path: '', component: () => import('@/views/dashboard/index')}
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {path: '', component: () => import('@/views/setting/index')}
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouteMap
})
