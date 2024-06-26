"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv").config();
// import dotenv from "dotenv";
// dotenv.config();
const config = {
    dbUser: process.env.DB_USER || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbHost: process.env.DB_HOST || "",
    dbName: process.env.DB_NAME || "",
    dbPort: process.env.DB_PORT || "",
};
exports.config = config;
// module.exports = {
//     config
// }
