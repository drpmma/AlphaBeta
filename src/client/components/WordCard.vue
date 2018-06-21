<template>
<el-card class="box-card word-card" shadow="hover">
  <div slot="header" class="clearfix">
    <span>{{name}}</span>
  </div>
     <div v-for="intros in intro" :key="intros">
        <el-button class="select-item" plain>{{intros}}</el-button>
    </div>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      name: 'software',
      intro: ['n. 软件', 'n. 水泥,纽带,接合剂,牙骨质,补牙物,基石;vt. 接合,用水泥涂;vi. 接合起来', 'n. 仪式;adj. 正式的', 'n. 世纪，一百年，成百的东西']
    }
  },
  mounted() {
    const dic = this.$store.state.dic
    const url = '/api/word?dic=' + dic
    console.log(url)
     this.$http.get(url)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>


<style>

.select-item{
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal !important;
    width: 100%;
    height: 6em;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.word-card {
  margin-left: 4.5em;
  margin-bottom: 1em;
}


@media screen and (max-width: 400px) {

}
@media screen and (min-width: 400px) {
  .word-card {
    width: 60%;
    margin: 0 auto;
  }
}
</style>