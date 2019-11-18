import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/layout/Layout'

export const constantRouteMap = [
  {path: '/login', component: () => import('@/views/auth/login'), hidden: true, meta: { title: '登录'}},
  {
    path: '/articles/:id', 
    component: () => import('@/views/article/detailh5.vue'),
    meta: { title: '哩嗑' }
  },
  {path: '/', component: Layout},
  {
    path: '/art', 
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/article/list'),
        meta: { title: '文章列表' }
      },
      {
        path: 'source',
        component: () => import('@/views/article/source'),
        meta: { title: '文章来源' }
      },
      {
        path: ':id',
        component: () => import('@/views/article/detail'),
        meta: { title: '文章详情' }
      },
      {
        path: ':id/editcontent',
        component: () => import('@/views/article/editContent'),
        meta: { title: '编辑文章' }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    children: [
      { path: '', component: () => import('@/views/user/index')}
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
  },
  {
    path: '/source',
    component: Layout,
    children: [
      {path: '', component: () => import('@/views/source/index') }
    ]
  },
  {
    path: '/poem',
    component: Layout,
    children: [
      {path: '', component: () => import('@/views/poem/index')}
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouteMap
})
