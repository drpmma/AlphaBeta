<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/client/components/HelloWorld.vue'


export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
