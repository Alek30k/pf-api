"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const product_controller_1 = require("../../controller/product.controller");
router.get("/", product_controller_1.getProducts);
router.get("/:id", product_controller_1.getProductById);
router.post("/createProducts", product_controller_1.createProducts);
router.put("/updateProduct", product_controller_1.updateProduct);
//router.delete("/deleteProducts/:id", deleteProducts);
exports.default = router;
