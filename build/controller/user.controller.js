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
exports.createUser = exports.getUsers = void 0;
const sequelize_1 = __importDefault(require("../config/sequelize"));
const { Users } = sequelize_1.default.models;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const allData = yield Users.findAll();
        return res.status(200).json(allData);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastName, email, password, avatar } = req.body;
        console.log(req.body);
        const allData = yield Users.create({
            name,
            lastName,
            email,
            password,
            avatar,
        });
        return res.status(200).json(allData);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
    }
});
exports.createUser = createUser;
