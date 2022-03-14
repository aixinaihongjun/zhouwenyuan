<template>
  <div id="login">
    <div class="login-area">
      <div class="main-button">
        <router-link :to="{ path: '/' }">
          <el-button type="success" icon="el-icon-arrow-left" circle></el-button>
        </router-link>
      </div>
      <h2>管理员登录</h2>
      <div style="margin-top: 20px">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              auto-complete="off"
              placeholder="用户名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              auto-complete="off"
              placeholder="密码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%"
              >登录</el-button
            >
          </el-form-item>
          <a href="" class="toRegister" @click="gotoRegister"> 没有账号？立即注册 </a>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http.js";
export default {
  name: "login",
  data() {
    // <!--验证用户名-->
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    // <!--验证密码-->
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    // <!--提交登录-->
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          http
            .post("/login", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            })
            .then((res) => {
              let { state, userInfo } = res.data;
              if (state == "success") {
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
                this.$store.commit("login", userInfo);
                this.$router.push("/manager");
              } else {
                this.$message.error("用户名或密码有误，请重新登录!");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // <!--进入注册页-->
    gotoRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
#login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-area {
  width: 500px;
  height: 500px;
}
.toRegister {
  text-decoration: none;
  color: #409eff;
}
.main-button {
  display: flex;
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>
