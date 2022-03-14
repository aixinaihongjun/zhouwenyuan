<template>
  <div id="detail_page">
    <div class="page">
      <div class="main-button">
        <router-link :to="{ path: '/' }">
          <el-button type="success" icon="el-icon-arrow-left" circle></el-button>
        </router-link>
      </div>
      <div class="content">
        <h2 class="top_title">{{ article.title }}</h2>
        <div style="margin-top: 10px">
          <span class="authorname font_big">Author:</span>
          <span v-for="author in article.authors" :key="author.author" class="authorname">
            {{ author.author }}
          </span>
        </div>
        <div style="margin-top: 10px">
          <span class="font_big abstractsize">Abstract: </span>
          <span class="line_height abstractsize">{{ article.abstract }}</span>
        </div>
        <el-button type="primary" style="margin-top: 10px" @click="getPic"
          >引用主题可视化</el-button
        >
        <p class="citation_abstract">引文摘要：</p>
        <div
          class="line_height abstractsize"
          v-for="(cite, index) in article.cite_abstract"
          :key="cite.id"
        >
          <div>{{ index + 1 }}.{{ cite.cite_abstract }}</div>
          <!-- <div>关键词：{{ cite.key_words }}</div> -->
        </div>
        <div id="positive_citation" v-bind:class="{ display_citation: show_positive }">
          <h4 class="citation_abstract">正面引用情感摘要：</h4>
          <div
            class="line_height abstractsize"
            v-for="(abs, index) in article.citation_abstract.positive"
            :key="abs.id"
          >
            <div>{{ index + 1 }}.{{ abs.positive_abstract }}</div>
          </div>
          <h4 class="citation_abstract">
            {{ article.citation.positive.length }}条正面引用情感
          </h4>
          <div
            class="line_height abstractsize"
            v-for="(positive, index) in article.citation.positive"
            :key="positive.id"
          >
            <div>{{ index + 1 }}.{{ positive.positive_citation }}</div>
          </div>
        </div>
        <div id="neutral_citation" v-bind:class="{ display_citation: show_neutral }">
          <h4 class="citation_abstract">中性引用情感摘要：</h4>
          <div
            class="line_height abstractsize"
            v-for="(abs, index) in article.citation_abstract.neutral"
            :key="abs.id"
          >
            <div>{{ index + 1 }}.{{ abs.neutral_abstract }}</div>
          </div>
          <h4 class="citation_abstract">
            {{ article.citation.neutral.length }}条中性引用情感
          </h4>
          <div
            class="line_height abstractsize"
            v-for="(neutral, index) in article.citation.neutral"
            :key="neutral.id"
          >
            <div>{{ index + 1 }}.{{ neutral.neutral_citation }}</div>
          </div>
        </div>
        <div id="negative_citation" v-bind:class="{ display_citation: show_negative }">
          <h4 class="citation_abstract">负面引用情感摘要：</h4>
          <div
            class="line_height abstractsize"
            v-for="(abs, index) in article.citation_abstract.negative"
            :key="abs.id"
          >
            <div>{{ index + 1 }}.{{ abs.negative_abstract }}</div>
          </div>
          <h4 class="citation_abstract">
            {{ article.citation.negative.length }}条负面引用情感
          </h4>
          <div
            class="line_height abstractsize"
            v-for="(negative, index) in article.citation.negative"
            :key="negative.id"
          >
            <div>{{ index + 1 }}.{{ negative.negative_citation }}</div>
          </div>
        </div>
        <div id="use" v-bind:class="{ display_citation: show_use }">
          <h4 class="citation_abstract">
            {{ article.citation_purpose.use.length }}条使用引用目的
          </h4>
          <div
            class="line_height abstractsize"
            v-for="(cite, index) in article.citation_purpose.use"
            :key="cite.id"
          >
            <div>{{ index + 1 }}.{{ cite.citation }}</div>
          </div>
        </div>
        <div id="substantiating" v-bind:class="{ display_citation: show_substantiating }">
          <h4 class="citation_abstract">
            {{ article.citation_purpose.substantiating.length }}条证实引用目的
          </h4>
          <div
            class="line_height abstractsize"
            v-for="(cite, index) in article.citation_purpose.substantiating"
            :key="cite.id"
          >
            <div>{{ index + 1 }}.{{ cite.citation }}</div>
          </div>
        </div>
        <div id="criticizing" v-bind:class="{ display_citation: show_criticizing }">
          <h4 class="citation_abstract">
            {{ article.citation_purpose.criticizing.length }}条批评引用目的
          </h4>
          <div
            class="line_height abstractsize"
            v-for="(cite, index) in article.citation_purpose.criticizing"
            :key="cite.id"
          >
            <div>{{ index + 1 }}.{{ cite.citation }}</div>
          </div>
        </div>
        <div id="comparison" v-bind:class="{ display_citation: show_comparison }">
          <h4 class="citation_abstract">
            {{ article.citation_purpose.comparison.length }}条比较引用目的
          </h4>
          <div
            class="line_height abstractsize"
            v-for="(cite, index) in article.citation_purpose.comparison"
            :key="cite.id"
          >
            <div>{{ index + 1 }}.{{ cite.citation }}</div>
          </div>
        </div>
        <div id="basis" v-bind:class="{ display_citation: show_basis }">
          <h4 class="citation_abstract">
            {{ article.citation_purpose.basis.length }}条基础引用目的
          </h4>
          <div
            class="line_height abstractsize"
            v-for="(cite, index) in article.citation_purpose.basis"
            :key="cite.id"
          >
            <div>{{ index + 1 }}.{{ cite.citation }}</div>
          </div>
        </div>
        <div id="neutral" v-bind:class="{ display_citation: show_neutral1 }">
          <h4 class="citation_abstract">
            {{ article.citation_purpose.neutral.length }}条客观引用目的
          </h4>
          <div
            class="line_height abstractsize"
            v-for="(cite, index) in article.citation_purpose.neutral"
            :key="cite.id"
          >
            <div>{{ index + 1 }}.{{ cite.citation }}</div>
          </div>
        </div>
        <!-- <div id="relevance" v-bind:class="{ display_citation: show_relevance }">
          <h4 class="citation_abstract">
            {{ article.literature.relevance.length }}条按相关度推荐引文
          </h4>
          <div
            class="line_height abstractsize"
            v-for="(con, index) in article.literature.relevance"
            :key="con.id"
          >
            <div>
              <a href="#" class="doc">{{ index + 1 }}.{{ con.content }}</a>
            </div>
          </div>
        </div>
        <div id="time" v-bind:class="{ display_citation: show_time }">
          <h4 class="citation_abstract">
            {{ article.literature.time.length }}条按时间推荐引文
          </h4>
          <div
            class="line_height abstractsize"
            v-for="(con, index) in article.literature.time"
            :key="con.id"
          >
            <div>
              <a href="#" class="doc">{{ index + 1 }}.{{ con.content }}</a>
            </div>
          </div>
        </div> -->
      </div>
      <div class="item">
        <!-- <div v-show="show_citation_type == 0">
          <a href="#" class="citation" @click="displayTotal">
            <span>{{
              article.citation.positive.length +
              article.citation.neutral.length +
              article.citation.negative.length
            }}</span
            >条引文
          </a>
          <a href="#" class="citation" @click="displayDoc"> 相关文献推荐</a>
        </div> -->
        <div v-show="show_citation_type == 1">
          <a href="#" class="citation" @click="displayEmotion">
            引用情感：<span>{{
              article.citation.positive.length +
              article.citation.neutral.length +
              article.citation.negative.length
            }}</span>
          </a>
          <a href="#" class="citation" @click="displayPurpose">
            引用目的：<span>{{
              article.citation_purpose.substantiating.length +
              article.citation_purpose.use.length +
              article.citation_purpose.comparison.length +
              article.citation_purpose.basis.length +
              article.citation_purpose.neutral.length +
              article.citation_purpose.criticizing.length
            }}</span>
          </a>
          <!-- <a href="#" class="citation" @click="displayArticle"> 返回上一级 </a> -->
        </div>
        <div v-show="show_citation_type == 2">
          <h3 class="total_citation">
            <span
              >{{
                article.citation.positive.length +
                article.citation.neutral.length +
                article.citation.negative.length
              }}条引用情感</span
            >
          </h3>
          <a href="#positive_citation" class="citation" @click="displayPositive">
            正面引用情感：<span>{{ article.citation.positive.length }}</span>
          </a>
          <a href="#neutral_citation" class="citation" @click="displayNeutral">
            中性引用情感：<span>{{ article.citation.neutral.length }}</span>
          </a>
          <a href="#negative_citation" class="citation" @click="displayNegative">
            负面引用情感：<span>{{ article.citation.negative.length }}</span>
          </a>
          <a href="#" class="citation" @click="displayTotal"> 返回上一级 </a>
        </div>
        <div v-show="show_citation_type == 3">
          <h3 class="total_citation">
            <span
              >{{
                article.citation_purpose.substantiating.length +
                article.citation_purpose.use.length +
                article.citation_purpose.comparison.length +
                article.citation_purpose.basis.length +
                article.citation_purpose.neutral.length +
                article.citation_purpose.criticizing.length
              }}条引用目的</span
            >
          </h3>
          <a href="#use" class="citation" @click="displayUse">
            使用引用目的：<span>{{ article.citation_purpose.use.length }}</span>
          </a>
          <a href="#substantiating" class="citation" @click="displaySubstantiating">
            证实引用目的：<span>{{
              article.citation_purpose.substantiating.length
            }}</span>
          </a>
          <a href="#criticizing" class="citation" @click="displayCriticizing">
            批评引用目的：<span>{{ article.citation_purpose.criticizing.length }}</span>
          </a>
          <a href="#comparison" class="citation" @click="displayComparison">
            比较引用目的：<span>{{ article.citation_purpose.comparison.length }}</span>
          </a>
          <a href="#basis" class="citation" @click="displayBasis">
            基础引用目的：<span>{{ article.citation_purpose.basis.length }}</span>
          </a>
          <a href="#neutral" class="citation" @click="displayNeutral1">
            客观引用目的：<span>{{ article.citation_purpose.neutral.length }}</span>
          </a>
          <a href="#" class="citation" @click="displayTotal"> 返回上一级 </a>
        </div>
        <div v-show="show_citation_type == 4">
          <a href="#relevance" class="citation" @click="displayRelevance">
            按相关度推荐
          </a>
          <a href="#time" class="citation" @click="displayTime"> 按时间推荐</a>
          <a href="#" class="citation" @click="displayArticle"> 返回上一级 </a>
        </div>
      </div>
    </div>
    <!-- <el-dialog
      title="引用主题可视化"
      :visible.sync="citeVisible"
      width="50%"
      :append-to-body="true"
      :modal-append-to-body="false"
    >
      <div
        :v-show="loading"
        v-loading="loading"
        element-loading-text="正在加载，请等待片刻......"
        element-loading-spinner="el-icon-loading"
      >
        <img :src="returnImg" alt="" style="width: 100%; height: 100%" />
      </div>
    </el-dialog> -->
    <el-image-viewer v-if="citeVisible" :on-close="onClose" :url-list="[returnImg]" />
  </div>
</template>

<script>
// 引入ElImageViewer组件
import ElImageViewer from "element-ui/packages/image/src/image-viewer";
import http from "@/utils/http.js";
export default {
  name: "Detail",
  components: {
    ElImageViewer,
  },
  data() {
    return {
      article: {
        id: "",
        authors: [],
        cite_abstract: [],
        citation: {
          positive: [],
          neutral: [],
          negative: [],
        },
        citation_abstract: {
          positive: [],
          neutral: [],
          negative: [],
        },
        citation_purpose: {
          substantiating: [],
          use: [],
          comparison: [],
          basis: [],
          neutral: [],
          criticizing: [],
        },
        literature: {
          relevance: [],
          time: [],
        },
      },
      show_positive: true,
      show_neutral: true,
      show_negative: true,
      show_substantiating: true,
      show_use: true,
      show_comparison: true,
      show_basis: true,
      show_neutral1: true,
      show_criticizing: true,
      show_relevance: true,
      show_time: true,
      show_citation_type: 1,
      citeVisible: false,
      returnImg: "",
      // loading: false,
    };
  },
  created() {
    this.article.id = this.$route.params.articleId;
    this.getArticleDetail();
  },
  methods: {
    getArticleDetail() {
      http.get("/getArticleDetail/" + this.article.id).then((res) => {
        this.article = res.data;
        // console.log(this.article);
      });
    },
    getPic() {
      this.citeVisible = true;
      // this.loading = true;
      this.returnImg = require("../assets/loading.gif");
      http.get("/getPic").then((res) => {
        // this.loading = false;
        this.returnImg = "data:image/png;base64," + res.data;
      });
    },
    onClose() {
      this.citeVisible = false;
    },
    displayPositive() {
      this.show_positive = false;
      this.show_neutral = true;
      this.show_negative = true;
      this.show_use = true;
      this.show_comparison = true;
      this.show_basis = true;
      this.show_neutral1 = true;
      this.show_criticizing = true;
      this.show_substantiating = true;
      this.show_relevance = true;
      this.show_time = true;
    },
    displayNeutral() {
      this.show_positive = true;
      this.show_neutral = false;
      this.show_negative = true;
      this.show_use = true;
      this.show_comparison = true;
      this.show_basis = true;
      this.show_neutral1 = true;
      this.show_criticizing = true;
      this.show_substantiating = true;
      this.show_relevance = true;
      this.show_time = true;
    },
    displayNegative() {
      this.show_positive = true;
      this.show_neutral = true;
      this.show_negative = false;
      this.show_use = true;
      this.show_comparison = true;
      this.show_basis = true;
      this.show_neutral1 = true;
      this.show_criticizing = true;
      this.show_substantiating = true;
      this.show_relevance = true;
      this.show_time = true;
    },
    displayUse() {
      this.show_positive = true;
      this.show_neutral = true;
      this.show_negative = true;
      this.show_use = false;
      this.show_comparison = true;
      this.show_basis = true;
      this.show_neutral1 = true;
      this.show_criticizing = true;
      this.show_substantiating = true;
      this.show_relevance = true;
      this.show_time = true;
    },
    displayComparison() {
      this.show_positive = true;
      this.show_neutral = true;
      this.show_negative = true;
      this.show_use = true;
      this.show_comparison = false;
      this.show_basis = true;
      this.show_neutral1 = true;
      this.show_criticizing = true;
      this.show_substantiating = true;
      this.show_relevance = true;
      this.show_time = true;
    },
    displayBasis() {
      this.show_positive = true;
      this.show_neutral = true;
      this.show_negative = true;
      this.show_use = true;
      this.show_comparison = true;
      this.show_basis = false;
      this.show_neutral1 = true;
      this.show_criticizing = true;
      this.show_substantiating = true;
      this.show_relevance = true;
      this.show_time = true;
    },
    displayNeutral1() {
      this.show_positive = true;
      this.show_neutral = true;
      this.show_negative = true;
      this.show_use = true;
      this.show_comparison = true;
      this.show_basis = true;
      this.show_neutral1 = false;
      this.show_criticizing = true;
      this.show_substantiating = true;
      this.show_relevance = true;
      this.show_time = true;
    },
    displayCriticizing() {
      this.show_positive = true;
      this.show_neutral = true;
      this.show_negative = true;
      this.show_use = true;
      this.show_comparison = true;
      this.show_basis = true;
      this.show_neutral1 = true;
      this.show_criticizing = false;
      this.show_substantiating = true;
      this.show_relevance = true;
      this.show_time = true;
    },
    displaySubstantiating() {
      this.show_positive = true;
      this.show_neutral = true;
      this.show_negative = true;
      this.show_use = true;
      this.show_comparison = true;
      this.show_basis = true;
      this.show_neutral1 = true;
      this.show_criticizing = true;
      this.show_substantiating = false;
      this.show_relevance = true;
      this.show_time = true;
    },
    displayRelevance() {
      this.show_positive = true;
      this.show_neutral = true;
      this.show_negative = true;
      this.show_use = true;
      this.show_comparison = true;
      this.show_basis = true;
      this.show_neutral1 = true;
      this.show_criticizing = true;
      this.show_substantiating = true;
      this.show_relevance = false;
      this.show_time = true;
    },
    displayTime() {
      this.show_positive = true;
      this.show_neutral = true;
      this.show_negative = true;
      this.show_use = true;
      this.show_comparison = true;
      this.show_basis = true;
      this.show_neutral1 = true;
      this.show_criticizing = true;
      this.show_substantiating = true;
      this.show_relevance = true;
      this.show_time = false;
    },
    displayEmotion() {
      this.show_citation_type = 2;
    },
    displayPurpose() {
      this.show_citation_type = 3;
    },
    displayTotal() {
      this.show_citation_type = 1;
    },
    displayArticle() {
      this.show_citation_type = 0;
    },
    displayDoc() {
      this.show_citation_type = 4;
    },
  },
};
</script>

<style>
#detail_page {
  background: #f0f1f2;
}
.top_title {
  margin-top: 30px;
}
.page {
  width: 80%;
  display: flex;
  margin: auto;
  text-align: left;
}
.content {
  width: 75%;
  margin-right: 50px;
}
.item {
  width: 175px;
  background: #fff;
  position: fixed;
  top: 30px;
  right: 10px;
  border: 0.5px solid rgb(0 0 0 / 10%);
  border-top: 10px solid #1857b6;
  padding-left: 50px;
}
.item .citation {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  text-decoration: none;
  color: #b85900;
}
.item .citation:hover {
  color: #1857b6;
  text-decoration: underline;
}
.display_citation {
  display: none;
}
.authorname {
  font-size: 12px;
}
.abstractsize {
  font-size: 14px;
}
.line_height {
  line-height: 24px;
}
.font_big {
  font-weight: 700;
}
.citation_abstract {
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
}
.total_citation {
  margin: 1rem 0;
}
.main-button {
  display: flex;
  position: absolute;
  left: 10px;
  top: 10px;
}
.doc {
  text-decoration: none;
  color: #2c3e50;
}
.doc:hover {
  text-decoration: underline;
}
</style>
