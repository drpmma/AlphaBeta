<template>
  <div class="home">
    <LeftMenu defaultActive="1"/>
    <div v-for="intros in this.dics" :key="intros._id">
      <VocabCard :name="intros.name" :intro="intros.intro"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LeftMenu from '@/client/components/LeftMenu.vue'
import VocabCard from '@/client/components/VocabCard.vue'

export default {
  name: 'home',
  components: {
    LeftMenu,
    VocabCard
  },
  mounted: function() {
    this.$http.get('/api/dicintro').
    then(response => {
        this.dics = response.data
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      dics: []
    }
  }
}
</script>
