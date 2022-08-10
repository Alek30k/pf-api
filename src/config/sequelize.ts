// import setupModels from "../db";
const { Sequelize } = require("sequelize");
require("dotenv").config();
// const fs = require("fs");
// const path = require("path");
// import { config } from "./config";
const { DATABASE_URL } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      })
    : new Sequelize(DATABASE_URL, { logging: false, native: false });

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
