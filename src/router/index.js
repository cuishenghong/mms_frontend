import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login/Login'
import Main from '../components/main/main'
import NavMenu from '../components/NavMenu/NavMenu'
import Inventory from '../components/Inventory/InventoryInfo'
import InventoryDetail from '../components/Inventory/InventoryDetail'
import InventoryInfoAdd from '../components/Inventory/InventoryInfoAdd'
import SaleInfo from '../components/Inventory/SaleInfo'
import SaleInfoAdd from '../components/Inventory/SaleInfoAdd'
import NotFound from '../components/NotFound'

import ProductionManage from '../components/ProductionManage/ProductionInfo'

import UserManage from '../components/SysManage/UserManage'
import RoleManage from '../components/SysManage/RoleManage'
import PermManage from '../components/SysManage/PermManage'
import DictManage from '../components/SysManage/DictManage'
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
      path: '/NavMenu',
      name: 'NavMenu',
      component: NavMenu,
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
      path: '/InventoryDetail',
      name: 'InventoryDetail',
      component: InventoryDetail,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/InventoryInfoAdd',
      name: 'InventoryInfoAdd',
      component: InventoryInfoAdd,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/SaleInfo',
      name: 'SaleInfo',
      component: SaleInfo,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/SaleInfoAdd',
      name: 'SaleInfoAdd',
      component: SaleInfoAdd,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/ProductionManage',
      name: 'ProductionManage',
      component: ProductionManage,
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
      path: '/RoleManage',
      name: 'RoleManage',
      component: RoleManage,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/PermManage',
      name: 'PermManage',
      component: PermManage,
      meta:{
        keepalive:true
      }
    },
    {
      path: '/DictManage',
      name: 'DictManage',
      component: DictManage,
      meta:{
        keepalive:true
      }
    }
    // {
    //   path: '/not-found',
    //   component: NotFound,
    //   name: 'not-found',
    //   meta:{
    //     keepalive:true
    //   }
    // }
  ]
})
