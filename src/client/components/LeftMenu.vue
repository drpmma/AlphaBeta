<template>
    <el-row class="tac">
  <el-col :span="4" class="left-items">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      :collapse="isCollapse">
      <el-menu-item index="1" @click="NavigateTo('/Home')">
        <i class="el-icon-check"></i>
        <span slot="title">学习</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-view"></i>
        <span slot="title">复习</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">单词本</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">考试</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </el-row>
</template>


<script>
export default {
  data() {
    return {
      isCollapse: document.body.clientWidth < 400
    };
  },
  props: {
    defaultActive: String
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    NavigateTo(route) {
      this.$router.push({ path: route });
    }
  }
};
</script>

<style>
.tac {
  text-align: center;
}
.el-row::after {
  clear: none !important;
}
.left-items {
  height: 1000px;
}
</style>
