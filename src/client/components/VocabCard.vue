<template>
<el-card class="box-card" shadow="hover">
  <div slot="header" class="clearfix">
    <span>{{name}}</span>
    <el-button style="float: right; padding: 3px 0" type="text">选择</el-button>
  </div>
  <div v-for="o in ['a', 'b']" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
</template>

<script>
export default {
  props: {
    name: String
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

.box-card {
  float: left;
  text-align: left;
  margin-left: 20px;
  margin-bottom: 20px;
}

@media screen and (max-width: 400px) {
  .box-card {
    width: 70%;
  }
}
@media screen and (min-width: 400px) {
  .box-card {
    width: 25%;
  }
}
</style>