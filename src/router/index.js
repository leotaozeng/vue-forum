import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
      props: true
    },

    {
      path: '/thread/edit/:threadId',
      name: 'ThreadEdit',
      component: () => import('@/views/PageThreadEdit'),
      props: true
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
      props: false
    },

    {
      path: '/me/edit',
      name: 'ProfileEdit',
      component: () => import('@/views/PageProfile'),
      props: {
        edit: true
      }
    },

    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('@/views/PageSignUp')
    },

    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('@/views/PageSignIn')
    },

    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/PageNotFound')
    }
  ]
})
