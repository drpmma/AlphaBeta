<template>
  <div class="home">
    <LeftMenu defaultActive="1"/>
    <VocabCard name="四级词汇"/>
    <VocabCard name="六级词汇"/>
    <VocabCard name="TOFEL"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LeftMenu from '@/client/components/LeftMenu.vue'
import VocabCard from '@/client/components/VocabCard.vue'

export default {
  name: 'selectVocab',
  components: {
    LeftMenu,
    VocabCard
  }
}
</script>
