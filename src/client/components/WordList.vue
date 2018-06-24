<template>
    <div>
    <el-table class="word-list"
      :data="tableData"
      style="width: 80%">
      <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="释义">
                {{ props.row.value }}
                </el-form-item>
                <el-form-item label="操作">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(props.$index, props.row)">删除</el-button>
                </el-form-item>
            </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="key"
        label="单词"
        style="width: 20%"
        fixed>
      </el-table-column>
      <el-table-column
        prop="type"
        label="类别">
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.$http
      .get("/api/getnote", {
        params: this.$route.query
      })
      .then(response => {
        console.log(response);
        this.tableData = response.data.map(value => {
            let result = value.word
            result._id = value._id
            result.user = value.user
            return result
        })
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    handleDelete(index, row) {
      this.$message({
        message: "已从你的笔记中删除",
        type: "success"
      });
      this.tableData.splice(index, 1);
      this.$http.post('/api/deletenote', {
          user: row.user,
          _id: row._id
      })
      .then(response => {
          console.log(response)
      })
      .catch(error => {
          console.log(error)
      })
    }
  }
};
</script>

<style>
.word-list {
  margin-left: 4.5em;
  margin: 0 auto;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  float: left;
  margin-right: 0;
  margin-bottom: 0;
}
</style>
