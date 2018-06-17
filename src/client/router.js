import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Signin from './views/Signin.vue'
import Signup from './views/Signup.vue'
import Cookie from '@/client/cookie'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/signin' }, 
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to.fullPath)
  if (to.fullPath === '/signin') {  // 判断该路由是否需要登录权限
    const user = Cookie.get('username')
      if (user) {  // 通过vuex state获取当前的token是否存在
          next({
            path: '/home',
            query: {user: user}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
      }
      else {
          next({
              path: '/signin',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})

export default router;