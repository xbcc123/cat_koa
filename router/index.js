/*
 * @Author: yankangjie
 * @Date: 2022-08-06 12:03:13
 * @LastEditors: yankangjie
 * @LastEditTime: 2022-08-06 12:18:37
 * @FilePath: /router/index.js
 * @Description: router
 */

const Router = require("koa-router");
const router = new Router();
const { init:  Counter } = require("./db");

// 猫咪列表
router.post("/api/cat-list", async (ctx) => {
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


// 养猫知识列表
router.post("/api/cat-disease-list", async (ctx) => {
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
