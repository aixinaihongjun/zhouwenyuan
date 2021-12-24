<template>
  <div class="home">
    <h1>引文管理系统</h1>
    <div class="search">
      <el-input placeholder="请输入文章ID" v-model="input" clearable> </el-input>
      <el-row>
        <el-button type="primary">搜索</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      input: "",
    };
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