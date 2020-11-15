<template>
  <div id="app">
    <el-container v-if="$route.meta.keepalive">
        <el-header>
          <v_NavMenu></v_NavMenu>
        </el-header>
        <el-main>
          <router-view></router-view> <!--路由出口 -->
        </el-main>
     </el-container>
    <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<script>
import LeftMenu from "./components/LeftMenu"
import Header from "./components/Header"
import  Footer from './components/Footer'
import NavMenu from './components/NavMenu'

export default {
  name: 'App',
  components: {
    'v_Header': Header,
    'v_leftmenu': LeftMenu,
    'v_footer': Footer,   
     'v_NavMenu': NavMenu

  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .header{
    line-height: 60px;
    background-color: #545c64;
    text-color: white;
  }
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    height: 100px;
    padding: 0px;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

</style>