<template>
  <div>
    <input type="text" v-model="username">
    <input type="password" v-model="password">
    <button @click="getLogin">登录</button>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: null,
        isSubmit: true // 防止多次提交
      }
    },
    methods: {
      getLogin() {
        let self = this;
        if (!self.isSubmit) {
          return
        }
        self.isSubmit = false
        self.$Loading.start();
        let query = {
          params: {
            username: this.username,
            password: this.password
          }
        }
        self.$axios.get('http://localhost:10086/queryUserByName',query).then(({data}) => {

          // console.log(this); //undefined   Promise
          if(data.code == 200) {
            self.$Loading.finish();
            let inTwoMinutes = new Date(new Date().getTime() + 2 * 60 * 1000);
            Cookies.set('user', self.username, {expires: inTwoMinutes});
            Cookies.set('token', data.data.token, {expires: inTwoMinutes});
            Cookies.set('access', data.data.access, {expires: inTwoMinutes});
            self.$Message.success('登录成功!');
            self.$router.push({ //路由跳转  $router与$route的区别
              name: 'home_index'
            })
          } else {
            self.$Loading.error();
            self.$Message.error('密码错误!');
          }
          self.isSubmit = true
        })
      }
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
