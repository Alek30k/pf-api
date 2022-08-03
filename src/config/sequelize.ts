// const {Sequelize} = require('sequelize');
import { Sequelize } from "sequelize";

// const setupModels = require('../db/models/index');
import setupModels from "../db";

// const {config} = require('../config/config');
import { config } from "./config";

const dbUrl: string = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize: Sequelize = new Sequelize(dbUrl, {
  dialect: "postgres",
  logging: true,
});

setupModels(sequelize);
sequelize.sync({ force: false });

export default sequelize;
// module.exports = sequelize;