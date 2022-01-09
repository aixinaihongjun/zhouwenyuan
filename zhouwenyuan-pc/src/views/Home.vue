<template>
  <div class="home">
    <h1>引文管理系统</h1>
    <div class="search">
      <el-input placeholder="请输入文章ID" v-model="input" clearable> </el-input>
      <el-row>
        <el-button type="primary" @click="getDetail">搜索</el-button>
      </el-row>
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
        if (this.input == item.number || this.input == item.title) {
          this.$router.push("/" + item.id);
          flag = 1;
        }
      });
      if (flag != 1) {
        this.$message({
          showClose: true,
          message: "没有这个文章ID，请重新输入！",
          type: "error",
        });
        this.input = "";
      }
    },
  },
};
</script>
<style>
.search {
  display: flex;
  width: 80%;
  margin: auto;
}
</style>
