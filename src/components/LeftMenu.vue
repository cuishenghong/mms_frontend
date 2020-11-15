<template>
  <div class="login">

  做菜单栏
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
