"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class ProductOrders extends sequelize_1.Model {
        static associate(models) {
            ProductOrders.belongsTo(models.Orders);
            ProductOrders.belongsTo(models.Products);
        }
    }
    ProductOrders.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "ProductOrders",
    });
    return ProductOrders;
};
