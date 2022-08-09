// const {Sequelize} = require('sequelize');
import { Sequelize } from "sequelize";
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
// const setupModels = require('../db/models/index');
import setupModels from "../db";

// const {config} = require('../config/config');
import { config } from "./config";

const dbUrl: string = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// const sequelize: Sequelize = new Sequelize(dbUrl, {
//   dialect: "postgres",
//   logging: true,
// });

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/mypc`, {
        logging: false,
        native: false,
      });

setupModels(sequelize);
sequelize.sync({ force: false });

export default sequelize;
// module.exports = sequelize;
