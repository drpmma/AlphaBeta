<template>
        <el-card class="exam-result-card">
        <div slot="header" class="clearfix">
            <span>考试结果</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="NavigateTo('/Home/note')">错误单词</el-button>
        </div>
        <el-progress type="circle" :percentage="percent" status="success"></el-progress>
        </el-card>

</template>

<script>

export default {
    methods: {
        NavigateTo(route) {
            this.$router.push({path:route})
        }
    },
    data() {
        return {
            percent: (Number)(this.$route.query.true * 10)
        }
    }
};
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.exam-result-card {
  margin-left: 4.5em;
  margin-bottom: 1em;
}

@media screen and (max-width: 400px) {
}
@media screen and (min-width: 400px) {
  .exam-result-card{
    width: 60%;
    margin: 0 auto;
  }
}
</style>

