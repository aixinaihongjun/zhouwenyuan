const child_process = require('child_process');
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
    `SELECT t_article.id as article_id, t_cite_abstract.cite_abstract, t_cite_abstract.key_words
    FROM t_cite_abstract, t_article
    WHERE t_cite_abstract.article_id = t_article.id AND t_article.id = ?`;
  let results3 = await getQueryData(sql3, [articleId]);

  let sql4 =
    `SELECT t_article.id as article_id, t_positive_citation.positive_citation
    FROM t_positive_citation, t_article
    WHERE t_positive_citation.article_id = t_article.id AND t_article.id = ?`;
  let results4 = await getQueryData(sql4, [articleId]);

  let sql5 =
    `SELECT t_article.id as article_id, t_neutral_citation.neutral_citation
    FROM t_neutral_citation, t_article
    WHERE t_neutral_citation.article_id = t_article.id AND t_article.id = ?`;
  let results5 = await getQueryData(sql5, [articleId]);

  let sql6 =
    `SELECT t_article.id as article_id, t_negative_citation.negative_citation
    FROM t_negative_citation, t_article
    WHERE t_negative_citation.article_id = t_article.id AND t_article.id = ?`;
  let results6 = await getQueryData(sql6, [articleId]);

  let sql7 =
    `SELECT t_article.id as article_id, t_positive_abstract.positive_abstract
    FROM t_positive_abstract, t_article
    WHERE t_positive_abstract.article_id = t_article.id AND t_article.id = ?`;
  let results7 = await getQueryData(sql7, [articleId]);

  let sql8 =
    `SELECT t_article.id as article_id, t_neutral_abstract.neutral_abstract
    FROM t_neutral_abstract, t_article
    WHERE t_neutral_abstract.article_id = t_article.id AND t_article.id = ?`;
  let results8 = await getQueryData(sql8, [articleId]);

  let sql9 =
    `SELECT t_article.id as article_id, t_negative_abstract.negative_abstract
    FROM t_negative_abstract, t_article
    WHERE t_negative_abstract.article_id = t_article.id AND t_article.id = ?`;
  let results9 = await getQueryData(sql9, [articleId]);

  let sql10 =
    `SELECT t_article.id as article_id, t_substantiating.citation
    FROM t_substantiating, t_article
    WHERE t_substantiating.article_id = t_article.id AND t_article.id = ?`;
  let results10 = await getQueryData(sql10, [articleId]);

  let sql11 =
    `SELECT t_article.id as article_id, t_use.citation
    FROM t_use, t_article
    WHERE t_use.article_id = t_article.id AND t_article.id = ?`;
  let results11 = await getQueryData(sql11, [articleId]);

  let sql12 =
    `SELECT t_article.id as article_id, t_comparison.citation
    FROM t_comparison, t_article
    WHERE t_comparison.article_id = t_article.id AND t_article.id = ?`;
  let results12 = await getQueryData(sql12, [articleId]);

  let sql13 =
    `SELECT t_article.id as article_id, t_basis.citation
    FROM t_basis, t_article
    WHERE t_basis.article_id = t_article.id AND t_article.id = ?`;
  let results13 = await getQueryData(sql13, [articleId]);

  let sql14 =
    `SELECT t_article.id as article_id, t_neutral.citation
    FROM t_neutral, t_article
    WHERE t_neutral.article_id = t_article.id AND t_article.id = ?`;
  let results14 = await getQueryData(sql14, [articleId]);

  let sql15 =
    `SELECT t_article.id as article_id, t_criticizing.citation
    FROM t_criticizing, t_article
    WHERE t_criticizing.article_id = t_article.id AND t_article.id = ?`;
  let results15 = await getQueryData(sql15, [articleId]);

  let sql16 =
    `SELECT t_article.id as article_id, t_relevance_literature.content
    FROM t_relevance_literature, t_article
    WHERE t_relevance_literature.article_id = t_article.id AND t_article.id = ?`;
  let results16 = await getQueryData(sql16, [articleId]);

  let sql17 =
    `SELECT t_article.id as article_id, t_time_literature.content
    FROM t_time_literature, t_article
    WHERE t_time_literature.article_id = t_article.id AND t_article.id = ?`;
  let results17 = await getQueryData(sql17, [articleId]);

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
    citation_purpose: {
      substantiating: results10,
      use: results11,
      comparison: results12,
      basis: results13,
      neutral: results14,
      criticizing: results15,
    },
    literature: {
      relevance: results16,
      time: results17,
    }
  }
  ctx.body = article;
});

router.post('/postManager', async (ctx) => {
  let { cite_article_sentence } = ctx.request.body;
  let sql = 'insert into t_manager(cite_article_sentence) values(?)';
  let results = await getQueryData(sql, [cite_article_sentence]);
  if (results.affectedRows > 0) {
    ctx.body = {
      state: 'success'
    }
  } else {
    ctx.body = {
      state: 'fail'
    }
  }
});

router.post('/postPlug', async (ctx) => {
  let { cite_article_sentence, article_id, type } = ctx.request.body;
  if (type == 0) {
    let positive_citation = cite_article_sentence;
    let sql = 'insert into t_positive_citation(positive_citation, article_id) values(?,?)';
    let results = await getQueryData(sql, [positive_citation, article_id]);

    let citation = cite_article_sentence;
    let sql1 = 'insert into t_use(citation, article_id) values(?,?)';
    let results1 = await getQueryData(sql1, [citation, article_id]);

    if (results.affectedRows > 0 && results1.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
  else if (type == 1) {
    let negative_citation = cite_article_sentence;
    let sql = 'insert into t_negative_citation(negative_citation, article_id) values(?,?)';
    let results = await getQueryData(sql, [negative_citation, article_id]);

    let citation = cite_article_sentence;
    let sql1 = 'insert into t_criticizing(citation, article_id) values(?,?)';
    let results1 = await getQueryData(sql1, [citation, article_id]);

    if (results.affectedRows > 0 && results1.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
  else if (type == 2) {
    let neutral_citation = cite_article_sentence;
    let sql = 'insert into t_neutral_citation(neutral_citation, article_id) values(?,?)';
    let results = await getQueryData(sql, [neutral_citation, article_id]);

    let citation = cite_article_sentence;
    let sql1 = 'insert into t_neutral(citation, article_id) values(?,?)';
    let results1 = await getQueryData(sql1, [citation, article_id]);

    if (results.affectedRows > 0 && results1.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
});

router.get('/getFind', async (ctx) => {
  let { title_delete_value, site_value } = ctx.request.query;
  if (site_value == 1) {
    let articleId = title_delete_value;
    let sql = `SELECT * FROM t_positive_citation WHERE article_id = ?`;
    let results = await getQueryData(sql, [articleId]);
    let results1 = [];
    results.forEach(item => {
      results1.push({
        id: item.id,
        article_id: item.article_id,
        cite: item.positive_citation
      })
    });
    ctx.body = results1;
  }
  else if (site_value == 2) {
    let articleId = title_delete_value;
    let sql = `SELECT * FROM t_neutral_citation WHERE article_id = ?`;
    let results = await getQueryData(sql, [articleId]);
    let results2 = [];
    results.forEach(item => {
      results2.push({
        id: item.id,
        article_id: item.article_id,
        cite: item.neutral_citation
      })
    });
    ctx.body = results2;
  }
  else if (site_value == 3) {
    let articleId = title_delete_value;
    let sql = `SELECT * FROM t_negative_citation WHERE article_id = ?`;
    let results = await getQueryData(sql, [articleId]);
    let results3 = [];
    results.forEach(item => {
      results3.push({
        id: item.id,
        article_id: item.article_id,
        cite: item.negative_citation
      })
    });
    ctx.body = results3;
  }
  else if (site_value == 4) {
    let articleId = title_delete_value;
    let sql = `SELECT * FROM t_use WHERE article_id = ?`;
    let results = await getQueryData(sql, [articleId]);
    let results4 = [];
    results.forEach(item => {
      results4.push({
        id: item.id,
        article_id: item.article_id,
        cite: item.citation
      })
    });
    ctx.body = results4;
  }
  else if (site_value == 5) {
    let articleId = title_delete_value;
    let sql = `SELECT * FROM t_substantiating WHERE article_id = ?`;
    let results = await getQueryData(sql, [articleId]);
    let results5 = [];
    results.forEach(item => {
      results5.push({
        id: item.id,
        article_id: item.article_id,
        cite: item.citation
      })
    });
    ctx.body = results5;
  }
  else if (site_value == 6) {
    let articleId = title_delete_value;
    let sql = `SELECT * FROM t_criticizing WHERE article_id = ?`;
    let results = await getQueryData(sql, [articleId]);
    let results6 = [];
    results.forEach(item => {
      results6.push({
        id: item.id,
        article_id: item.article_id,
        cite: item.citation
      })
    });
    ctx.body = results6;
  }
  else if (site_value == 7) {
    let articleId = title_delete_value;
    let sql = `SELECT * FROM t_comparison WHERE article_id = ?`;
    let results = await getQueryData(sql, [articleId]);
    let results7 = [];
    results.forEach(item => {
      results7.push({
        id: item.id,
        article_id: item.article_id,
        cite: item.citation
      })
    });
    ctx.body = results7;
  }
  else if (site_value == 8) {
    let articleId = title_delete_value;
    let sql = `SELECT * FROM t_basis WHERE article_id = ?`;
    let results = await getQueryData(sql, [articleId]);
    let results8 = [];
    results.forEach(item => {
      results8.push({
        id: item.id,
        article_id: item.article_id,
        cite: item.citation
      })
    });
    ctx.body = results8;
  }
  else if (site_value == 9) {
    let articleId = title_delete_value;
    let sql = `SELECT * FROM t_neutral WHERE article_id = ?`;
    let results = await getQueryData(sql, [articleId]);
    let results9 = [];
    results.forEach(item => {
      results9.push({
        id: item.id,
        article_id: item.article_id,
        cite: item.citation
      })
    });
    ctx.body = results9;
  }
});

router.post('/delete', async (ctx) => {
  let { tid, site_value } = ctx.request.body;
  if (site_value == 1) {
    let id = tid;
    let sql = 'delete from t_positive_citation where id = ?';
    let results = await getQueryData(sql, [id]);
    if (results.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
  else if (site_value == 2) {
    let id = tid;
    let sql = 'delete from t_neutral_citation where id = ?';
    let results = await getQueryData(sql, [id]);
    if (results.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
  else if (site_value == 3) {
    let id = tid;
    let sql = 'delete from t_negative_citation where id = ?';
    let results = await getQueryData(sql, [id]);
    if (results.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
  else if (site_value == 4) {
    let id = tid;
    let sql = 'delete from t_use where id = ?';
    let results = await getQueryData(sql, [id]);
    if (results.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
  else if (site_value == 5) {
    let id = tid;
    let sql = 'delete from t_substantiating where id = ?';
    let results = await getQueryData(sql, [id]);
    if (results.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
  else if (site_value == 6) {
    let id = tid;
    let sql = 'delete from t_criticizing where id = ?';
    let results = await getQueryData(sql, [id]);
    if (results.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
  else if (site_value == 7) {
    let id = tid;
    let sql = 'delete from t_comparison where id = ?';
    let results = await getQueryData(sql, [id]);
    if (results.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
  else if (site_value == 8) {
    let id = tid;
    let sql = 'delete from t_basis where id = ?';
    let results = await getQueryData(sql, [id]);
    if (results.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
  else if (site_value == 9) {
    let id = tid;
    let sql = 'delete from t_neutral where id = ?';
    let results = await getQueryData(sql, [id]);
    if (results.affectedRows > 0) {
      ctx.body = {
        state: 'success'
      }
    } else {
      ctx.body = {
        state: 'fail'
      }
    }
  }
});

router.post('/register', async (ctx) => {
  let { username, password } = ctx.request.body;
  let sql = 'insert ignore into t_user(username, password) values(?,?)';
  let results = await getQueryData(sql, [username, password]);
  if (results.affectedRows > 0) {
    ctx.body = {
      state: 'success'
    }
  } else {
    ctx.body = {
      state: 'fail'
    }
  }
})

router.post('/login', async (ctx) => {
  let { username, password } = ctx.request.body;
  let sql = `SELECT * FROM t_user WHERE username=? and password=?`;
  let results = await getQueryData(sql, [username, password]);
  if (results.length > 0) {
    ctx.body = {
      state: "success",
      userInfo: results[0]
    };
  } else {
    ctx.body = {
      state: "fail"
    };
  }
})

router.get('/getManager', async (ctx) => {
  let sql = `SELECT * FROM t_manager order by id desc limit 1`;
  let result = await getQueryData(sql);
  let sentence = result[0].cite_article_sentence;
  var fs = require("fs");
  var fd = fs.openSync("D:/zwy/shiyan/123.txt", 'w');
  fs.writeSync(fd, sentence);
  fs.closeSync(fd);
  child_process.execSync('cd /d "D:/zwy/shiyan" && python use_model.py');
  let data = fs.readFileSync("D:/zwy/shiyan/zwy.txt", "utf-8");

  ctx.body = {
    data: data,
    sentence: sentence,
  };
});

router.get('/getPic', async (ctx) => {
  var fs = require("fs");
  child_process.execSync('cd /d "D:/pythonProject2" && python biaoqian.py');
  let data = fs.readFileSync("D:/pythonProject2/cloud_large.png", "base64");
  // ctx.type = 'image/png';
  ctx.body = data;
});

module.exports = router
