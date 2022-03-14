<template>
  <div id="register">
    <div class="register-area">
      <div class="main-button">
        <router-link :to="{ path: '/' }">
          <el-button type="success" icon="el-icon-arrow-left" circle></el-button>
        </router-link>
      </div>
      <h2>管理员注册</h2>
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
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              auto-complete="off"
              placeholder="确认密码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%"
              >注册</el-button
            >
          </el-form-item>
          <a href="" class="toLogin" @click="gotoLogin"> 已有账号？直接登录 </a>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http.js";
export default {
  name: "Register",
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
    // <!--验证第二次输入密码-->
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    // <!--提交注册-->
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          http
            .post("/register", {
              username: this.ruleForm.username,
              password: this.ruleForm.password,
            })
            .then((res) => {
              let { state } = res.data;
              if (state == "success") {
                this.$message({
                  message: "注册成功",
                  type: "success",
                });
                this.$router.push("/login");
              } else {
                this.$message.error("用户名已存在，可直接登录！");
                this.$router.push("/login");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // <!--进入登录页-->
    gotoLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#register {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-area {
  width: 500px;
  height: 500px;
}
.toLogin {
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
