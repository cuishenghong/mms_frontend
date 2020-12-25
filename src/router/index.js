import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login'
import Main from '../components/main/main'
import Inventory from '../components/Inventory/ProductionDetail'
import NotFound from '../components/NotFound'
import NavMenu from '../components/NavMenu/NavMenu'
import ProductionInfo from '../components/ProductionInfo/ProductionInfo'
import UserManage from '../components/SysManage/UserManage'
import ElementUi from 'element-ui'
import '@/theme-et/index.css'
Vue.use(ElementUi)

Vue.use(Router)

export default new Router({
  mode:'history',
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
      path: '/Inventory',
      name: 'Inventory',
      component: Inventory,
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
      path: '/ProductionInfo',
      name: 'ProductionInfo',
      component: ProductionInfo,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/UserManage',
      name: 'UserManage',
      component: UserManage,
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
