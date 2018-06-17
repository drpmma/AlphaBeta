<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1">AlphaBeta</el-menu-item>
  <el-menu-item index="2">关于</el-menu-item>
  <el-menu-item v-if="!this.$store.state.user" class="right" index="3" @click="NavigateTo('/signin')">登录</el-menu-item>
  <el-menu-item v-else class="right" index="3" @click="NavigateTo('/signin')">{{this.$store.state.user}}</el-menu-item>
</el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      NavigateTo(route) {
        this.$router.push(route)
      }
    }
  }
</script>

<style>
.right{
  position:absolute;
  right:0%;
}
</style>
