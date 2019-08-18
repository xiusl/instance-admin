import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // getToken from cookie

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
    // next()
    if (getToken()) {
        if (to.path === '/login') {
            next('/')
        } else {
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login') // 否则全部重定向到登录页
        }
    }
})

router.afterEach(() => {
  // NProgress.done() // finish progress bar
})
