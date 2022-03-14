<template>
  <div id="manager">
    <div class="main-button">
      <router-link :to="{ path: '/' }">
        <el-button type="success" icon="el-icon-arrow-left" circle></el-button>
      </router-link>
    </div>
    <div style="display: flex; flex-direction: column; height: 100%">
      <div class="search" style="margin-top: 50px; height: 40px">
        <el-input placeholder="请输入引文句子" v-model="input" clearable> </el-input>
        <el-row>
          <el-button type="primary" @click="toJudge">判断</el-button>
        </el-row>
      </div>

      <div
        style="width: 100%; margin-top: 20px"
        :v-show="loading"
        v-loading="loading"
        element-loading-text="正在判断，请等待片刻......"
        element-loading-spinner="el-icon-loading"
      >
        <el-alert
          :title="returnType == '' ? '等待判断结果' : returnType"
          type="success"
          style="width: 80%; margin-left: 140px"
          :closable="false"
        >
        </el-alert>
        <!-- <h2 style="line-height: 50px">{{ returnType }}</h2> -->
      </div>

      <div
        style="
          display: flex;
          line-height: 40px;
          margin-top: 20px;
          margin-left: 150px;
          height: 40px;
        "
      >
        添加引文
        <el-select
          style="width: 500px; margin-left: 20px"
          v-model="title_value"
          clearable
          placeholder="请选择文章标题"
        >
          <el-option
            v-for="item in articles"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-button
          style="margin-left: 20px"
          type="primary"
          @click="plugDialogVisible = true"
          >插入句子</el-button
        >
        <el-dialog title="提示" :visible.sync="plugDialogVisible" width="30%">
          <span>确定要把这条引文插入到这篇文章中吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="plugDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="plugIn">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <div
        style="
          display: flex;
          line-height: 40px;
          margin-top: 20px;
          margin-left: 150px;
          height: 40px;
        "
      >
        搜索引文
        <el-select
          style="width: 500px; margin-left: 20px"
          v-model="title_delete_value"
          clearable
          placeholder="请选择文章标题"
        >
          <el-option
            v-for="item in articles"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select
          style="width: 300px; margin-left: 20px"
          v-model="site_value"
          clearable
          placeholder="请选择引用类型"
        >
          <el-option
            v-for="item in site_types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button style="margin-left: 20px" type="primary" @click="find">查询</el-button>
      </div>
      <div style="margin: 20px 150px">
        <el-table :data="tableData" border style="width: 100%" height="340">
          <el-table-column type="index" label="序号" width="50"> </el-table-column>
          <el-table-column prop="cite" label="引文"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="take(scope.row)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="提示" :visible.sync="deleteDialogVisible" width="30%">
          <span>确定要删除这条引文吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleClick(row_message)">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http.js";
export default {
  name: "Manager",
  data() {
    return {
      input: "",
      returnType: "",
      returnSentence: "",
      returnCode: "",
      // returnCode1: "",
      loading: false,
      articles: [],
      title_value: "",
      title_delete_value: "",
      site_value: "",
      site_types: [
        {
          value: "1",
          label: "正面引用情感",
        },
        {
          value: "2",
          label: "中性引用情感",
        },
        {
          value: "3",
          label: "负面引用情感",
        },
        {
          value: "4",
          label: "使用引用目的",
        },
        {
          value: "5",
          label: "证实引用目的",
        },
        {
          value: "6",
          label: "批评引用目的",
        },
        {
          value: "7",
          label: "比较引用目的",
        },
        {
          value: "8",
          label: "基础引用目的",
        },
        {
          value: "9",
          label: "客观引用目的",
        },
      ],
      tableData: [],
      plugDialogVisible: false,
      deleteDialogVisible: false,
      row_message: [],
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    async toJudge() {
      if (this.input != "") {
        this.returnType = "";
        this.loading = true;
        await http.post("/postManager", { cite_article_sentence: this.input });
        http.get("/getManager").then((res) => {
          this.loading = false;
          this.returnCode = res.data.data;
          // this.returnCode1 = res.data.data1;
          this.returnSentence = res.data.sentence;
          if (res.data.data == 0) {
            this.returnType = "经判断，您刚才输入的句子的引用情感为正面，引用目的为使用";
          } else if (res.data.data == 1) {
            this.returnType = "经判断，您刚才输入的句子的引用情感为负面，引用目的为批评";
          } else if (res.data.data == 2) {
            this.returnType = "经判断，您刚才输入的句子的引用情感为中性，引用目的为客观";
          }
        });
      } else {
        this.$message.error("引文句子输入为空，请重新输入!");
      }
    },
    getArticles() {
      http.get("/getArticle").then((res) => {
        this.articles = res.data;
        // console.log(this.articles);
      });
    },
    plugIn() {
      this.plugDialogVisible = false;
      if (this.input != "" && this.title_value != "") {
        http
          .post("/postPlug", {
            cite_article_sentence: this.returnSentence,
            article_id: this.title_value,
            type: this.returnCode,
          })
          .then((res) => {
            let { state } = res.data;
            if (state == "success") {
              this.$message({
                message: "该引用句提交成功!",
                type: "success",
              });
              // this.$router.push("/");
            } else {
              this.$message.error("该引用句提交失败，请重新提交!");
            }
          });
      } else if (this.input == "" && this.title_value != "") {
        this.$message.error("引文句子输入为空，请重新输入!");
      } else if (this.title_value == "" && this.input != "") {
        this.$message.error("文章标题选择为空，请重新选择!");
      } else if (this.input == "" && this.title_value == "") {
        this.$message.error("引文句子输入与文章标题选择都为空，请重试!");
      }
    },
    find() {
      if (this.title_delete_value != "" && this.site_value != "") {
        http
          .get("/getFind", {
            params: {
              title_delete_value: this.title_delete_value,
              site_value: this.site_value,
            },
          })
          .then((res) => {
            this.tableData = res.data;
          });
      } else if (this.title_delete_value == "" && this.site_value != "") {
        this.$message.error("文章标题选择为空，请重新选择!");
      } else if (this.title_delete_value != "" && this.site_value == "") {
        this.$message.error("引用类型选择为空，请重新选择!");
      } else if (this.title_delete_value == "" && this.site_value == "") {
        this.$message.error("文章标题选择与引用类型选择都为空，请重试!");
      }
    },
    take(e) {
      this.deleteDialogVisible = true;
      this.row_message = e;
    },
    handleClick(e) {
      this.deleteDialogVisible = false;
      http
        .post("/delete", {
          tid: e.id,
          site_value: this.site_value,
        })
        .then((res) => {
          let { state } = res.data;
          if (state == "success") {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.find();
          } else {
            this.$message.error("该引用句提交失败，请重新提交!");
          }
        });
    },
  },
};
</script>

<style>
#manager {
  height: 100vh;
}
</style>
