import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Google from '@/components/google'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/google',
      name: 'Google',
      component: Google,
      beforeEnter: function(to, from, next) {
        if (localStorage.getItem('accessToken')){
          next()
        }else {
          alert('You must login')
        }
      }
    }
  ]
   
})
