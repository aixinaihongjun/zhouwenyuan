// 加载MySQL驱动
const mysql = require('mysql');
// 连接数据库
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'zhouwenyuan'
});
const router = require('koa-router')()

function getQueryData(sql, params = []) {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, function (error, results) {
      if (error) reject(error);
      resolve(results);
    });
  })
}

router.get('/getArticle', async (ctx) => {
  let sql = `SELECT * FROM t_article`;
  let results = await getQueryData(sql);
  ctx.body = results;
});

router.get('/getArticleDetail/:id', async (ctx) => {
  let articleId = ctx.params.id;
  let sql = `SELECT * FROM t_article WHERE t_article.id=?`;
  let results = await getQueryData(sql, [articleId]);
  let article = results[0];

  let sql2 =
    `SELECT t_article.id as article_id, t_author.author
    FROM t_author, t_article
    WHERE t_article.id = t_author.article_id AND t_article.id = ?`;
  let results2 = await getQueryData(sql2, [articleId]);

  let sql3 =
    `SELECT t_article.id as article_id, t_cite_abstract.cite_abstract, t_cite_abstract.key_words, t_cite_abstract.cite_abstract_id
    FROM t_cite_abstract, t_article
    WHERE t_cite_abstract.article_id = t_article.id AND t_article.id = ?`;
  let results3 = await getQueryData(sql3, [articleId]);

  let sql4 =
    `SELECT t_article.id as article_id, t_positive_citation.positive_citation, t_positive_citation.positive_citation_id
    FROM t_positive_citation, t_article
    WHERE t_positive_citation.article_id = t_article.id AND t_article.id = ?`;
  let results4 = await getQueryData(sql4, [articleId]);

  let sql5 =
    `SELECT t_article.id as article_id, t_neutral_citation.neutral_citation, t_neutral_citation.neutral_citation_id
    FROM t_neutral_citation, t_article
    WHERE t_neutral_citation.article_id = t_article.id AND t_article.id = ?`;
  let results5 = await getQueryData(sql5, [articleId]);

  let sql6 =
    `SELECT t_article.id as article_id, t_negative_citation.negative_citation, t_negative_citation.negative_citation_id
    FROM t_negative_citation, t_article
    WHERE t_negative_citation.article_id = t_article.id AND t_article.id = ?`;
  let results6 = await getQueryData(sql6, [articleId]);

  let sql7 =
    `SELECT t_article.id as article_id, t_positive_abstract.positive_abstract, t_positive_abstract.positive_abstract_id
    FROM t_positive_abstract, t_article
    WHERE t_positive_abstract.article_id = t_article.id AND t_article.id = ?`;
  let results7 = await getQueryData(sql7, [articleId]);

  let sql8 =
    `SELECT t_article.id as article_id, t_neutral_abstract.neutral_abstract, t_neutral_abstract.neutral_abstract_id
    FROM t_neutral_abstract, t_article
    WHERE t_neutral_abstract.article_id = t_article.id AND t_article.id = ?`;
  let results8 = await getQueryData(sql8, [articleId]);

  let sql9 =
    `SELECT t_article.id as article_id, t_negative_abstract.negative_abstract, t_negative_abstract.negative_abstract_id
    FROM t_negative_abstract, t_article
    WHERE t_negative_abstract.article_id = t_article.id AND t_article.id = ?`;
  let results9 = await getQueryData(sql9, [articleId]);

  article = {
    id: article.id,
    number: article.number,
    title: article.title,
    abstract: article.abstract,
    authors: results2,
    cite_abstract: results3,
    citation: {
      positive: results4,
      neutral: results5,
      negative: results6,
    },
    citation_abstract: {
      positive: results7,
      neutral: results8,
      negative: results9,
    },
  }
  ctx.body = article;
});

module.exports = router
