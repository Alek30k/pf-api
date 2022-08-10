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
exports.nameProducts = exports.updateProduct = exports.getProductById = exports.createProducts = exports.getProducts = void 0;
const sequelize_1 = __importDefault(require("../config/sequelize"));
const { Products, Categories, Review, Users, ProductCategories } = sequelize_1.default.models;
const { Op } = require("sequelize");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //nameProducts(req, res)
    try {
        //devuelvo un arreglo
        const { categories, price, name, searchName } = req.query;
        console.log(categories);
        const allData = yield Products.findAll({
            include: [
                {
                    model: ProductCategories,
                    include: [
                        {
                            model: Categories,
                        },
                    ],
                },
            ],
        });
        let newRows = allData.map((r) => {
            let products = r === null || r === void 0 ? void 0 : r.dataValues;
            return products;
        });
        // if (categories) {
        //   let filteraArray = newRows.filter((e) => {
        //     if (
        //       e.ProductCategories[0]?.Category?.name === categories ||
        //       e.ProductCategories[1]?.Category?.name === categories ||
        //       e.ProductCategories[2]?.Category?.name === categories ||
        //       e.ProductCategories[3]?.Category?.name === categories ||
        //       e.ProductCategories[4]?.Category?.name === categories
        //     ) {
        //       return newRows;
        //     }
        //   });
        //   let newArray = filteraArray.map((e) => {
        //     return {
        //       id: e.id,
        //       name: e.name,
        //       description: e.description,
        //       price: e.price,
        //       stock: e.stock,
        //       enable: e.enable,
        //       image: e.image,
        //       category: e.ProductCategories.map((e: any) => e.Category.name),
        //     };
        //   });
        //   if (newArray.length === 0) {
        //     return res.status(404).json("NO EXISTE CATEGORIA");
        //   } else {
        //     return res.status(202).json(newArray);
        //   }
        // }
        if (categories) {
            if (typeof (categories) === 'string') {
                newRows = newRows.filter(p => {
                    const dataCategories = p.ProductCategories.map((c) => c.toJSON().Category.name);
                    return dataCategories.includes(categories);
                });
            }
            else if (Array.isArray(categories)) {
                // for(let category of categories){ //Filtra productos por las categorias seleccionadas a la vez
                //   newRows = newRows.filter(p => {
                //     const dataCategories = p.ProductCategories.map((c:any) => c.toJSON().Category.name); 
                //     return dataCategories.includes(category)
                //   })
                // }
                newRows = newRows.filter(p => {
                    const dataCategories = p.ProductCategories.map((c) => c.toJSON().Category.name);
                    return categories.some(c => dataCategories.includes(c));
                });
            }
        }
        //for price
        if (price === "asc") {
            let asc = newRows.sort((first, second) => first.price - second.price);
            return res.send(asc);
        }
        else if (price === "desc") {
            let desc = newRows.sort((first, second) => second.price - first.price);
            return res.send(desc);
        }
        if (name === "A-Z") {
            let nameSort = newRows.sort((prev, next) => {
                if (prev.name > next.name)
                    return 1;
                if (prev.name < next.name)
                    return -1;
                return 0;
            });
            return res.status(202).json(nameSort);
        }
        if (name === "Z-A") {
            let nameSort = newRows.sort((prev, next) => {
                if (prev.name > next.name)
                    return -1;
                if (prev.name < next.name)
                    return 1;
                return 0;
            });
            return res.status(202).json(nameSort);
        }
        if (name && name !== "Z-A" && name !== "A-Z") {
            let productName = newRows.filter((r) => r.name.includes(name));
            return res.status(202).json(productName);
        }
        if (searchName) {
            return (0, exports.nameProducts)(req, res);
        }
        return res.status(202).json(newRows);
    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ error: "Error -->> getProducts" });
    }
});
exports.getProducts = getProducts;
const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //llega data del form
        const { name, description, price, stock, image, categorie } = req.body;
        //validamos si hay campos vacios
        if (!name || !description || !price || !stock || !image || !categorie) {
            return res.status(404).json({ error: "Faltan espacios por llenar" });
        }
        //creamos el producto
        const createProduct = yield Products.create({
            name,
            description,
            price,
            stock,
            image,
        });
        const arrayCategorie = categorie.map((data) => ({ name: data }));
        let categories = yield Categories.findAll({
            where: {
                [Op.or]: arrayCategorie,
            },
        });
        categories.map((r) => __awaiter(void 0, void 0, void 0, function* () {
            yield ProductCategories.create({
                ProductId: createProduct.toJSON().id,
                CategoryId: r.toJSON().id,
            });
        }));
        return res
            .status(202)
            .send({ messaje: "Created Successfully :D", createProduct });
    }
    catch (error) {
        console.log(error);
        return res.send({ error: "Error -->> createProducts" });
    }
});
exports.createProducts = createProducts;
// export const deleteProducts = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params as { id: string };
//     const user = await Products.findByPk(id);
//     if (user) {
//       await user.destroy();
//       res.json({ message: "User removed" });
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(404).json({ error: "Error -->> deleteProducts" });
//   }
// };
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const idProduct = req.params.idProduct as unknown as number;
    try {
        const { id } = req.params;
        const product = yield Products.findByPk(id, {
            include: [
                {
                    model: ProductCategories,
                    include: [
                        {
                            model: Categories,
                        },
                    ],
                },
                {
                    model: Review,
                    include: [
                        {
                            model: Users,
                            attributes: {
                                exclude: ["password", "rol"],
                            },
                        },
                    ],
                },
            ],
        });
        if (!product)
            return res.status(404).json({ status: 404, msg: "Product not found" });
        return res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, description, price, stock, image, date, categories, enable } = req.body;
    try {
        const fields = {};
        if (name)
            fields.name = name;
        if (description)
            fields.description = description;
        if (price)
            fields.price = price;
        if (stock)
            fields.stock = stock;
        if (image)
            fields.image = image;
        if (date)
            fields.date = date;
        if (enable === true || enable === false)
            fields.enable = enable;
        // if (categories) fields.categories = categories;
        if (Object.keys(fields).length === 0 && ((categories === null || categories === void 0 ? void 0 : categories.length) === 0 || !Array.isArray(categories)) || !id)
            return res
                .status(400)
                .json({ status: 400, msg: "Bad request.Verify your data" });
        const [, productUpdate] = yield Products.update(fields, {
            where: {
                id,
            },
            returning: true
        });
        if (productUpdate.length === 0) {
            return res.status(400).json({ status: 400, msg: "Bad request.Product not exist" });
        }
        if ((categories === null || categories === void 0 ? void 0 : categories.length) > 0) {
            yield ProductCategories.destroy({
                where: {
                    ProductId: id
                }
            });
            const newCategories = categories.map((data) => ({ name: data }));
            let findCategories = yield Categories.findAll({
                where: {
                    [Op.or]: newCategories,
                },
            });
            // findCategories.map(async (r: any) => {
            //   await ProductCategories.create({
            //     ProductId: id,
            //     CategoryId: r.toJSON().id,
            //   });
            // });
            for (let r of findCategories) {
                yield ProductCategories.create({
                    ProductId: id,
                    CategoryId: r.toJSON().id,
                });
            }
        }
        return res.status(200).json({ msg: `Update product id ${id}` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json("internal server error");
    }
});
exports.updateProduct = updateProduct;
const nameProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allProducts = yield Products.findAll();
    const searchName = req.query.searchName;
    try {
        if (searchName) {
            let productsResult = allProducts.filter((e) => e.name.toLowerCase().includes(searchName.toString().toLowerCase()));
            return productsResult ?
                res.status(200).send(productsResult) : res.status(400).send(`⚠ Ops!!! name not found.Enter valido name`);
        }
    }
    catch (err) {
        console.log(err);
    }
    return res.status(500).json("internal server error");
});
exports.nameProducts = nameProducts;
