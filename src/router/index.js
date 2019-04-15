import Vue from 'vue'
import Router from 'vue-router'
// import NProgress from 'nprogress'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/PageHome')
    },

    {
      path: '/category/:categoryId',
      name: 'Category',
      component: () => import('@/views/PageCategory'),
      props: true
    },

    {
      path: '/forum/:forumId',
      name: 'Forum',
      component: () => import('@/views/PageForum'),
      props: true
    },

    {
      path: '/thread/create/:forumId',
      name: 'ThreadCreate',
      component: () => import('@/views/PageThreadCreate'),
      props: true,
      meta: { requiresAuth: true }
    },

    {
      path: '/thread/edit/:threadId',
      name: 'ThreadEdit',
      component: () => import('@/views/PageThreadEdit'),
      props: true,
      meta: { requiresAuth: true }
    },

    {
      path: '/thread/:threadId',
      name: 'ThreadShow',
      component: () => import('@/views/PageThreadShow'),
      props: true
    },

    {
      path: '/me',
      name: 'Profile',
      component: () => import('@/views/PageProfile'),
      props: false,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'bar',
          component: () => import('@/views/PageProfile')
        }
      ]
    },

    {
      path: '/me/edit',
      name: 'ProfileEdit',
      component: () => import('@/views/PageProfile'),
      props: { edit: true },
      meta: { requiresAuth: true }
    },

    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/PageSignUp'),
      meta: { requiresGuest: true }
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/PageLogIn'),
      meta: { requiresGuest: true }
    },

    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: (to, from, next) => store.dispatch('logout')
    },

    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/PageNotFound')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(1, store.state.authId)
    if (store.state.authId) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    console.log(2, store.state.authId)
    if (store.state.authId) {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
