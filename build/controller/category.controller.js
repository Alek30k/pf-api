"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategories = exports.getCategories = void 0;
const sequelize_1 = __importDefault(require("../config/sequelize"));
const { Categories } = sequelize_1.default.models;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Categories.findAll();
        return res.status(200).json(categories);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
    }
});
exports.getCategories = getCategories;
const createCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image } = req.body;
        const findCategorie = yield Categories.findOne({ where: { name } });
        if (findCategorie) {
            return res.send("Ya existe una categoria con este nombre");
        }
        if (!name) {
            return res.status(404).json({ Error: "Te faltan espacios por llenar" });
        }
        const createCategorie = yield Categories.create({ name, image });
        return res
            .status(202)
            .json({ Message: "createCategori Succefully", createCategorie });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
    }
});
exports.createCategories = createCategories;
