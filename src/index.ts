// const express = require('express');
import express, { Express, Response } from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// const routerApi = require('./routers');
import routerApi from "./routers/index";

// const { logError, errorHandler } = require('./middlewares/error.handler.js');
import { logError, errorHandler } from "./middlewares/error.handler";
// import { env } from "process";
const { CORS_URL } = process.env;
const app: Express = express();
// const port: number = 3001;
const { conn } = require("./src/db");

app.use(express.json());
// const { PORT } = process.env;

//aca vamos a poner los cors
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use((_req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", CORS_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH,  PUT, DELETE"
  );
  next();
});

//aca mostrando la ruta principal
app.get("/", (res: Response): void => {
  res.send("Esta funcionando correctamente!");
});

//aca utilizamos la funcion que contiene todas las rutas
routerApi(app); //y pasamos app como argumento

//aca queremos poner los middleware de errores
app.use(logError);
app.use(errorHandler);

//por ultimo el puerto por donde escucha
conn.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
