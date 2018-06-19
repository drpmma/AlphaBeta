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
  props: {
    name: String,
    intro: Array
  },
//   methods: {
//     startLearning() {
//       console.log(this.$props.name)
//     }
//   }
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

/*
@media screen and (max-width: 400px) {
  .vocab-card{
    height: 15em;
    width: 70%;
  }
}
@media screen and (min-width: 400px) {
  .vocab-card {
    height: 15em;
    width: 25%;
  }
} */
</style>