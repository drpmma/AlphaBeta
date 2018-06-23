<template>
<div class="user-interface">
<el-row>
    <el-col>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="40px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <router-link to="/signup"><el-button >注册账号</el-button></router-link>
        </el-form-item>
        </el-form>
    </el-col>
</el-row>
</div>
</template>

<script>
export default {
  data() {
    const checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        account: "",
        pass: ""
      },
      rules: {
        account: [{ validator: checkAccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/api/user", {
              username: this.$data.ruleForm.account,
              password: this.$data.ruleForm.pass
            })
            .then(response => {
              this.$message({
                  message: '登录成功',
                  type: 'success'
              });
              this.$store.commit("login", this.$data.ruleForm.account);
              this.$router.push({ path: "/home" });
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
.user-interface {
  margin: 0 auto;
}
@media screen and (max-width: 400px) {
  .user-interface {
    width: 70%;
  }
}
@media screen and (min-width: 400px) {
  .user-interface {
    width: 25%;
  }
}
</style>
