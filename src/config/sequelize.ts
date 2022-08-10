// const {Sequelize} = require('sequelize');
import { Sequelize } from "sequelize";
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
// const setupModels = require('../db/models/index');
import setupModels from "../db";
const path = require("path");
const fs = require("fs");

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

const basename = path.basename(__filename);

const modelDefiners: any[] = [];
//hola
// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file: any) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      (file.slice(-3) === ".ts" || file.slice(-3) === ".js")
  )
  .forEach((file: any) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { User, Product, Order } = sequelize.models;

// Aca vendrian las relaciones

/* Un usuario tiene muchos procutos // Un producto pertenece a muchos usuarios */
User.hasMany(Product, { sourceKey: "id", foreignKey: "user_id", as: "sell" });
// console.log(sequelize.models)

// User.hasMany(Product);
Product.belongsTo(User);

/* Un usuario tiene muchos pedidos // Un pedido pertenece a un usuario */
User.hasMany(Order);
Order.belongsTo(User);

/* Un pedido tiene muchos procutos // Un producto pertenece a muchos pedidos */
Order.hasMany(Product);
Product.belongsTo(Order);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
