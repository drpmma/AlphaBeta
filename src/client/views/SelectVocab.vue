<template>
    <div>
        <div v-for="intros in this.dics" :key="intros._id">
            <VocabCard :name="intros.name" :intro="intros.intro"/>
        </div>
    </div>
</template>

<script>
import VocabCard from "@/client/components/VocabCard.vue";

export default {
  components: {
    VocabCard
  },
  mounted() {
    this.$http
      .get("/api/dicintro")
      .then(response => {
        this.dics = response.data;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      dics: []
    };
  }
};
</script>

