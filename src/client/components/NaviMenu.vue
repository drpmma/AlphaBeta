<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1" @click="NavigateTo('/home')">AlphaBeta</el-menu-item>
  <el-menu-item v-if="this.$store.state.token" index="2" @click="NavigateTo('/about')">关于</el-menu-item>
  <el-menu-item v-if="this.$store.state.token" class="right" index="3" @click="NavigateTo('/profile')">{{this.$store.state.token}}</el-menu-item>
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
        console.log(key, keyPath)
      },
      NavigateTo(route) {
        this.$router.push({path:route})
      }
    },
  }
</script>

<style>
.right{
  position:absolute;
  right:0%;
}
</style>
