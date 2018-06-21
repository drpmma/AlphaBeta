<template>
  <div id="app">
    <div id="nav">
      <NaviMenu/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import NaviMenu from "@/client/components/NaviMenu.vue";
import Cookie from '@/client/cookie'

export default {
  name: "navi",
  components: {
    NaviMenu
  },
  created: function() {
    if (this.$store.state.token === null)
      this.$store.state.token = Cookie.get("username")
    if (this.$store.state.lastdic === null)
      this.$store.state.lastdic = Cookie.get("lastdic")
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
