<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item index="1" @click="this.$router.push('/home')">AlphaBeta</el-menu-item>
  <el-menu-item index="2" @click="this.$router.push('/about')">关于</el-menu-item>
  <el-menu-item v-if="this.$store.state.token" class="right" index="3" @click="this.$router.push('/profile')">{{this.$store.state.token}}</el-menu-item>
</el-menu>
</template>

<script>
  import Cookie from '@/client/cookie'
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
    },
    created: function() {
      if (this.$store.state.token === null)
        this.$store.state.token = Cookie.get('username')
    }
  }
</script>

<style>
.right{
  position:absolute;
  right:0%;
}
</style>
