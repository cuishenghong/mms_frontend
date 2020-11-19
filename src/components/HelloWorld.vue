<template>
  <div class="login">
  <el-page-header @back="goBack" content="详情页面">
</el-page-header>
  <el-button type="primary" icon="el-icon-search">搜索</el-button>

  </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return {
        name: '',
        pwd : '',
        error : {
          name: '',
          pwd : ''
        }
      }
    },
    methods:{
       goBack() {
        console.log('go back');
      },
      login(){
        const { name, pwd, $router} = this
        this.$router.push({
          name: "Main",
          params: {
            username: this.name
          }
        });
      }
    }
  }
</script>

<style>
  .login{
    margin-top: 200px;
  }
  .input_style{
    width: 200px;
    margin-bottom: 10px;
  }
  .login_style{
    width: 200px;
  }
</style>
