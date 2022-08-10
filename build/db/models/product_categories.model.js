"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class ProductCategories extends sequelize_1.Model {
        static associate(models) {
            //ProductCategories.belongsTo(models.Orders);
            ProductCategories.belongsTo(models.Products);
            ProductCategories.belongsTo(models.Categories);
        }
    }
    ProductCategories.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: "ProductCategories",
    });
    return ProductCategories;
};
