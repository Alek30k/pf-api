"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { PORT } = require("./config");
// const routerApi = require('./routers');
const index_1 = __importDefault(require("./routers/index"));
// const { logError, errorHandler } = require('./middlewares/error.handler.js');
const error_handler_1 = require("./middlewares/error.handler");
// import { env } from "process";
const { CORS_URL } = process.env;
const app = (0, express_1.default)();
// const port: number = 3001;
const { conn } = require("./src/db");
app.use(express_1.default.json());
// const { PORT } = process.env;
//aca vamos a poner los cors
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", CORS_URL); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH,  PUT, DELETE");
    next();
});
//aca mostrando la ruta principal
app.get("/", (res) => {
    res.send("Esta funcionando correctamente!");
});
//aca utilizamos la funcion que contiene todas las rutas
(0, index_1.default)(app); //y pasamos app como argumento
//aca queremos poner los middleware de errores
app.use(error_handler_1.logError);
app.use(error_handler_1.errorHandler);
//por ultimo el puerto por donde escucha
conn.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
});
