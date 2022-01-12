<template>
  <div class="home">
    <div class="app-page HACK__is-desktop home-page__search_emphasis">
      <h1 class="title_color title_position">引用内容分析平台</h1>
      <div class="search">
        <el-input placeholder="请输入文章ID/标题" v-model="input" clearable>
        </el-input>
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
          message: "没有这个文章ID/标题，请重新输入！",
          type: "error",
        });
        this.input = "";
      }
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
  display: grid;
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
</style>
