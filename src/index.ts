// const express = require('express');
import express, { Express, Request, Response, NextFunction } from "express";

// const routerApi = require('./routers');
import routerApi from "./routers/index";

// const { logError, errorHandler } = require('./middlewares/error.handler.js');
import { logError, errorHandler } from "./middlewares/error.handler";
import { env } from "process";
const { CORS_URL } = process.env;
const app: Express = express();
const port: number = 3001;

app.use(express.json());
const { PORT } = process.env;

//aca vamos a poner los cors

app.use((_req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
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
app.get("/", (req: Request, res: Response): void => {
  res.send("Esta funcionando correctamente!");
});

//aca utilizamos la funcion que contiene todas las rutas
routerApi(app); //y pasamos app como argumento

//aca queremos poner los middleware de errores
app.use(logError);
app.use(errorHandler);

//por ultimo el puerto por donde escucha
app.listen(process.env.PORT || 3001, (): void => {
  // console.log(`Utilizando el puerto ${port}`);
});
