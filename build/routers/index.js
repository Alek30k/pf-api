"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./users/user.router"));
const products_router_1 = __importDefault(require("./products/products.router"));
const categories_router_1 = __importDefault(require("./categories/categories.router"));
function routerApi(app) {
    const router = express_1.default.Router();
    app.use("/api/v1", router); //ruta de api principal api
    router.use("/users", user_router_1.default);
    router.use("/products", products_router_1.default);
    router.use("/categories", categories_router_1.default);
}
// module.exports = routerApi;
exports.default = routerApi;
