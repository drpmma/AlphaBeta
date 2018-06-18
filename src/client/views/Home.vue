<template>
  <div class="home">
    <LeftMenu/>
  </div>
</template>

<script>
// @ is an alias to /src
import LeftMenu from '@/client/components/LeftMenu.vue'

export default {
  name: 'home',
  components: {
    LeftMenu
  }
}
</script>
