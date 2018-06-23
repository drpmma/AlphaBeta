import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Study from './views/Study.vue'
import Note from './views/Note.vue'
import About from './views/About.vue'
import Signin from './views/Signin.vue'
import Signup from './views/Signup.vue'
import Profile from './views/Profile.vue'
import SelectVocab from './views/SelectVocab.vue'
import Cookie from '@/client/cookie'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/signin' }, 
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {path: '', component: SelectVocab},
        {path: 'study', component: Study},
        {path: 'note', component: Note}
      ]
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
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
  ]
})

router.beforeEach((to, from, next) => {
  const user = Cookie.get('username')
  const dic = Cookie.get('lastdic')
  let query = {}
  if (user) {
    query.user = user
    if (to.path == '/home/study' && dic) {
      query.dic = dic
    }
    if (Object.keys(to.query).length === 0) {
      next({
        path: to.fullPath,
        query: query
      })
    }
    else if(to.path == '/signin' || to.path == '/signup') {
      next({
        path: '/home',
      })
    }
    else {
      next()
    }
  }
  else {
    if (to.path !== '/signin' && to.path !== '/signup') {
      next({
        path: '/signin',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
    else {
      next()
    }
  }
})

export default router;