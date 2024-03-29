import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/layout/Layout'

export const constantRouteMap = [
  {path: '/login', component: () => import('@/views/auth/login'), hidden: true, meta: { title: '登录'}},
  {path: '/register', component: () => import('@/views/auth/register'), hidden: true, meta: { title: '注册'}},
  {
    path: '/articles/:id', 
    component: () => import('@/views/article/detailh5.vue'),
    meta: { title: '哩嗑' }
  },
    {
        path: '/products/:id/versions/:v_id', 
        component: () => import('@/views/products/version')
    },
  { path: '/privacy', component: () => import('@/views/setting/privacy'), meta: { title: '哩嗑'}},
  { path: '/help', component: () => import('@/views/setting/help'), meta: { title: '哩嗑' }},
  { path: '/usage', component: () => import('@/views/setting/usage'), meta: { title: '哩嗑'}},
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
  },
  {
    path: '/status',
    component: Layout,
    children: [
      { path: '', component: () => import('@/views/status/list') }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    children: [
      {path: '', component: () => import('@/views/feedback/index')}
    ]
  },
  {
    path: '/logs',
    component: Layout,
    children: [
        {path: '', component: () => import('@/views/log/index')}
    ]
  },
  {
    path: '/products',
    component: Layout,
    children: [
        { path: '', component: () => import('@/views/products/index') },
        {path: ':id', component: () => import('@/views/products/detail')} 
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouteMap
})
