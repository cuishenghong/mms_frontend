import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login'
import Main from '../components/main/main'
import HelloWorld from '../components/HelloWorld'
import NotFound from '../components/NotFound'
import NavMenu from '../components/NavMenu/NavMenu'
import ElementUi from 'element-ui'
import '@/theme-et/index.css'
Vue.use(ElementUi)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta:{
        keepalive:false
      }
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/NavMenu',
      name: 'NavMenu',
      component: NavMenu,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/not-found',
      component: NotFound,
      name: 'not-found',
      meta:{
        keepalive:true
      }
    }
  ]
})
