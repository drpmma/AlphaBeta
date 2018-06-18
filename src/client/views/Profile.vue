<template>
    <el-button type="danger" round @click="logout">退出</el-button>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    logout() {
      this.$store.commit("logout")
      this.$router.push('/signin')
    }
  }
}
</script>

