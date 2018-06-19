<template>
  <div class="home">
    <LeftMenu defaultActive="1"/>
    <WordCard name="software" :intro="['n. 软件', 'n. 水泥,纽带,接合剂,牙骨质,补牙物,基石;vt. 接合,用水泥涂;vi. 接合起来', 'n. 仪式;adj. 正式的', 'n. 世纪，一百年，成百的东西']"/>
  </div>
</template>

<script>
import LeftMenu from "@/client/components/LeftMenu.vue";
import WordCard from "@/client/components/WordCard.vue";

export default {
  components: {
    LeftMenu,
    WordCard
  }
};
</script>

<style>
</style>

