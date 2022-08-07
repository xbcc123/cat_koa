/*
 * @Author: yankangjie
 * @Date: 2022-08-06 12:01:20
 * @LastEditors: yankangjie
 * @LastEditTime: 2022-08-07 13:45:57
 * @FilePath: /index.js
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const Koa = require("koa");
const Router = require("koa-router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const fs = require("fs");
const path = require("path");
const { init: initDB, Counter, cat_list } = require("./db");

const router = new Router();

const homePage = fs.readFileSync(path.join(__dirname, "index.html"), "utf-8");

// 首页
router.get("/", async (ctx) => {
  ctx.body = homePage;
});

// 更新计数
router.post("/api/count", async (ctx) => {
  const { request } = ctx;
  const { action } = request.body;
  if (action === "inc") {
    await Counter.create();
  } else if (action === "clear") {
    await Counter.destroy({
      truncate: true,
    });
  }

  ctx.body = {
    code: 0,
    data: await Counter.count(),
  };
});

// 获取计数
router.get("/api/count", async (ctx) => {
  const result = await Counter.count();

  ctx.body = {
    code: 0,
    data: result,
  };
});

// 小程序调用，获取微信 Open ID
router.get("/api/wx_openid", async (ctx) => {
  if (ctx.request.headers["x-wx-source"]) {
    ctx.body = ctx.request.headers["x-wx-openid"];
  }
});


// 猫咪列表
router.post("/api/cat-list", async (ctx) => {
  const result = await cat_list.findAll();
  ctx.body = {
    code: 0,
    data: result,
  };
});

// 增加猫咪
router.post("/api/add-cat-list", async (ctx) => {
  const { request } = ctx;
  const { action, title, content } = request.body;
  if (action === "inc") {
      await cat_list.create({
        title,
        content,
        read: 0
      });
  } else if (action === "clear") {
      await cat_list.destroy({
          truncate: true,
      });
  }
  ctx.body = {
    code: 0,
    data: await cat_list.count(),
  };
});

// 养猫知识列表
router.post("/api/cat-disease-list", async (ctx) => {
  const { request } = ctx;
  const { action, title, content } = request.body;
  console.log(request);
  if (action === "inc") {
      await Counter.create({
        title,
        content
      });
  } else if (action === "clear") {
      await Counter.destroy({
          truncate: true,
      });
  }

  ctx.body = {
      code: 0,
      data: await Counter.count(),
  };
});

// 猫咪疾病列表
router.post("/api/cat-raise-list", async (ctx) => {
  const { request } = ctx;
  const { action } = request.body;
  if (action === "inc") {
      await Counter.create();
  } else if (action === "clear") {
      await Counter.destroy({
          truncate: true,
      });
  }
  ctx.body = {
      code: 0,
      data: await Counter.count(),
  };
});

// 用户中心
router.post("/api/use-info", async (ctx) => {
  const { request } = ctx;
  const { action } = request.body;
  if (action === "inc") {
      await Counter.create();
  } else if (action === "clear") {
      await Counter.destroy({
          truncate: true,
      });
  }

  ctx.body = {
      code: 0,
      data: await Counter.count(),
  };
});


const app = new Koa();
app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT || 80;
async function bootstrap() {
  await initDB();
  app.listen(port, () => {
    console.log("启动成功", port);
  });
}
bootstrap();
