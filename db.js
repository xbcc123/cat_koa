/*
 * @Author: yankangjie
 * @Date: 2022-08-06 12:01:20
 * @LastEditors: yankangjie
 * @LastEditTime: 2022-08-08 10:49:00
 * @FilePath: /db.js
 * @Description: 数据库配置
 */
const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 定义数据模型
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// 猫列表
const cat_list = sequelize.define('cat_list', {
  title: DataTypes.TEXT,
  content: DataTypes.TEXT,
  cover: DataTypes.STRING,
  read: DataTypes.INTEGER,
}, {
  tableName: 'cat_list'
});

// 猫知识
const cat_disease = sequelize.define('cat_disease', {
  title: DataTypes.TEXT,
  content: DataTypes.TEXT,
  cover: DataTypes.STRING,
  read: DataTypes.INTEGER,
}, {
  tableName: 'cat_disease'
});

// 猫疾病
const cat_raise = sequelize.define('cat_raise', {
  title: DataTypes.TEXT,
  content: DataTypes.TEXT,
  cover: DataTypes.STRING,
  read: DataTypes.INTEGER,
}, {
  tableName: 'cat_raise'
});


// 数据库初始化方法
async function init() {
  await Counter.sync();
  await cat_list.sync({ alter: true });
  await cat_disease.sync({ alter: true });
  await cat_raise.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Counter,
  cat_list,
  cat_disease,
  cat_raise
};
