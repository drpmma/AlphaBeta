<template>
<el-card class="box-card vocab-card" shadow="hover">
  <div slot="header" class="clearfix">
    <span>{{name}}</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="startLearning">选择</el-button>
  </div>
  <p>{{intro}}</p>
</el-card>
</template>

<script>
export default {
  props: {
    name: String,
    intro: String
  },
  methods: {
    startLearning() {
      this.$store.commit('saveDic', this.$props.name)
      this.$router.push({path:'/home/study', query:{user: this.$store.state.token, dic:this.$props.name}})
    }
  }
};
</script>


<style>
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

.vocab-card {
  float: left;
  text-align: left;
  margin-left: 1em;
  margin-bottom: 1em;
}

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
}
</style>