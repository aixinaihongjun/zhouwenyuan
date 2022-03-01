<template>
  <div class="home">
    <div class="app-page HACK__is-desktop home-page__search_emphasis">
      <div class="manager-button">
        <el-button type="success" @click="gotoManager">管理员系统</el-button>
      </div>
      <div class="hello-area" v-if="$store.state.userInfo.isLogin">
        <div class="hello">你好，{{ $store.state.userInfo.username }}</div>
        <el-button style="margin-left: 10px" type="danger" @click="dialogVisible = true"
          >退出登录</el-button
        >
      </div>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>确定要退出登录吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="exit">确 定</el-button>
        </span>
      </el-dialog>
      <h1 class="title_color title_position">引用内容分析平台</h1>
      <div class="search">
        <el-input placeholder="请输入文章ID/标题" v-model="input" clearable> </el-input>
        <el-row>
          <el-button type="primary" @click="getDetail">搜索</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http.js";
export default {
  name: "Home",
  data() {
    return {
      input: "",
      articles: [],
      dialogVisible: false,
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      http.get("/getArticle").then((res) => {
        this.articles = res.data;
        // console.log(this.articles);
      });
    },
    getDetail() {
      var flag;
      this.articles.forEach((item) => {
        if (
          this.input == item.number ||
          this.input.toUpperCase() == item.title.toUpperCase()
        ) {
          this.$router.push("/" + item.id);
          flag = 1;
        }
      });
      if (flag != 1) {
        this.$message({
          showClose: true,
          message: "没有这个文章ID/标题，请重新输入！",
          type: "error",
        });
        this.input = "";
      }
    },
    gotoManager() {
      if (this.$store.state.userInfo.isLogin) {
        this.$router.push("/manager");
      } else {
        this.$router.push("/login");
      }
    },
    exit() {
      this.dialogVisible = false;
      this.$store.commit("logout");
      this.$message({
        message: "您已成功退出登录!",
        type: "success",
      });
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.title_position {
  position: relative;
  top: 200px;
}
.title_color {
  color: #f3d25f;
}
.home-page__search_emphasis {
  background: no-repeat 0 0, #11223d;
  background-image: url(../assets/homepage-background.svg);
  height: 100vh;
}
.app-page {
  display: flex;
  flex-direction: column;
  grid-template-areas:
    "app-page__header"
    "app-page__content"
    "app-page__footer";
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: var(--app-height);
}
.search {
  display: flex;
  width: 80%;
  margin: auto;
}
.manager-button {
  display: flex;
  position: absolute;
  right: 10px;
  top: 10px;
}
.hello-area {
  display: flex;
  position: absolute;
  left: 10px;
  top: 10px;
}
.hello {
  color: #fff;
  font-size: 20px;
  line-height: 40px;
}
</style>
