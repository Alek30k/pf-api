// import setupModels from "../db";
require("dotenv").config();
const { Sequelize } = require("sequelize");
require("dotenv").config();
// const fs = require("fs");
// const path = require("path");
// import { config } from "./config";
// const { DATABASE_URL } = process.env;
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DATABASE_URL,
  ENVIRONMENT,
} = process.env;

const url =
  ENVIRONMENT === "development"
    ? `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    : DATABASE_URL;

const options =
  ENVIRONMENT === "development"
    ? {
        logging: false,
        native: false,
      }
    : {
        logging: false,
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      };

const sequelize = new Sequelize(url, options);

// const dbUrlLocal: string = postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName};

// const url: string = ${config.dbUrl};

// interface Options {
//   dialect: any,
//   logging: boolean
//   dialectOptions: object
// }

// let options= {
//   dialect: 'postgres', //elijo la db que voy a utilizar
//   logging: config.isProd ? false : true,
//   dialectOptions: {}
//  }

//  if(config.isProd) {
//   options.dialectOptions = {
//     ssl: {
//       rejectUnauthorized:false
//     }
//   }
//  }

// const sequelize: Sequelize = new Sequelize(dbUrl, {
//   dialect: "postgres",
//   logging: true,
// });
// const sequelize = new Sequelize(url, options);

// setupModels(sequelize);
// sequelize.sync({ force: false });

// // export default sequelize;
// module.exports = sequelize
