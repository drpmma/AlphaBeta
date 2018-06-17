<template>
  <div class="hello">
    <h1 @click="getData">{{ msg }}</h1>
    <el-button type="danger" round @click="logout">退出</el-button>
  </div>
</template>

<script>
import Cookie from "@/client/cookie"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    getData() {
      this.$http.get('/api/book')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    logout() {
      Cookie.delete('username')
      this.$store.commit("logout")
      this.$router.push('/signin')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
