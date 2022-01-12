<template>
  <div id="detail_page">
    <div class="page">
      <div class="content">
        <h2 class="top_title">{{ article.title }}</h2>
        <span class="authorname font_big">Author:</span>
        <span
          v-for="author in article.authors"
          :key="author.author"
          class="authorname"
        >
          {{ author.author }}
        </span>
        <br />
        <span class="font_big abstractsize">Abstract: </span>
        <span class="line_height abstractsize">{{ article.abstract }}</span>
        <p class="citation_abstract">引用摘要：</p>
        <div
          class="line_height abstractsize"
          v-for="cite in article.cite_abstract"
          :key="cite.id"
        >
          <div>{{ cite.cite_abstract_id }}.{{ cite.cite_abstract }}</div>
          <!-- <div>关键词：{{ cite.key_words }}</div> -->
        </div>
        <div
          id="positive_citation"
          v-bind:class="{ display_citation: show_positive }"
        >
          <h4 class="citation_abstract">正面引用摘要：</h4>
          <div
            class="line_height abstractsize"
            v-for="abs in article.citation_abstract.positive"
            :key="abs.id"
          >
            <div>
              {{ abs.positive_abstract_id }}.{{ abs.positive_abstract }}
            </div>
          </div>
          <h4 class="citation_abstract">
            {{ article.citation.positive.length }}条正面引用
          </h4>
          <div
            class="line_height abstractsize"
            v-for="positive in article.citation.positive"
            :key="positive.id"
          >
            <div>
              {{ positive.positive_citation_id }}.{{
                positive.positive_citation
              }}
            </div>
          </div>
        </div>
        <div
          id="neutral_citation"
          v-bind:class="{ display_citation: show_neutral }"
        >
          <h4 class="citation_abstract">中性引用摘要：</h4>
          <div
            class="line_height abstractsize"
            v-for="abs in article.citation_abstract.neutral"
            :key="abs.id"
          >
            <div>{{ abs.neutral_abstract_id }}.{{ abs.neutral_abstract }}</div>
          </div>
          <h4 class="citation_abstract">
            {{ article.citation.neutral.length }}条中性引用
          </h4>
          <div
            class="line_height abstractsize"
            v-for="neutral in article.citation.neutral"
            :key="neutral.id"
          >
            <div>
              {{ neutral.neutral_citation_id }}.{{ neutral.neutral_citation }}
            </div>
          </div>
        </div>
        <div
          id="negative_citation"
          v-bind:class="{ display_citation: show_negative }"
        >
          <h4 class="citation_abstract">负面引用摘要：</h4>
          <div
            class="line_height abstractsize"
            v-for="abs in article.citation_abstract.negative"
            :key="abs.id"
          >
            <div>
              {{ abs.negative_abstract_id }}.{{ abs.negative_abstract }}
            </div>
          </div>
          <h4 class="citation_abstract">
            {{ article.citation.negative.length }}条负面引用
          </h4>
          <div
            class="line_height abstractsize"
            v-for="negative in article.citation.negative"
            :key="negative.id"
          >
            <div>
              {{ negative.negative_citation_id }}.{{
                negative.negative_citation
              }}
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <h3 class="total_citation">
          <span
            >{{
              article.citation.positive.length +
              article.citation.neutral.length +
              article.citation.negative.length
            }}条引文</span
          >
        </h3>
        <a href="#positive_citation" class="citation" @click="displayPositive">
          正面引用：<span>{{ article.citation.positive.length }}</span>
        </a>
        <a href="#neutral_citation" class="citation" @click="displayNeutral">
          中性引用：<span>{{ article.citation.neutral.length }}</span>
        </a>
        <a href="#negative_citation" class="citation" @click="displayNegative">
          负面引用：<span>{{ article.citation.negative.length }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http.js";
export default {
  name: "Detail",
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
      },
      show_positive: true,
      show_neutral: true,
      show_negative: true,
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
    displayPositive() {
      this.show_positive = false;
      this.show_neutral = true;
      this.show_negative = true;
    },
    displayNeutral() {
      this.show_positive = true;
      this.show_neutral = false;
      this.show_negative = true;
    },
    displayNegative() {
      this.show_positive = true;
      this.show_neutral = true;
      this.show_negative = false;
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
  width: 150px;
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
  margin-top: 30px;
  margin-bottom: 10px;
  font-weight: 700;
}
.total_citation {
  margin: 1rem 0;
}
</style>
