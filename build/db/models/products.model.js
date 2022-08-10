"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Products extends sequelize_1.Model {
        //producto puede tener muchas categorias
        static associate(models) {
            Products.hasMany(models.Review);
            Products.hasMany(models.Favorites);
            Products.hasMany(models.ProductOrders);
            Products.hasMany(models.ProductCategories);
        }
    }
    Products.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
        },
        enable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Products",
    });
    return Products;
};
