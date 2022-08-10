"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Orders extends sequelize_1.Model {
        static associate(models) {
            //una order puede tener muchos productos
            Orders.belongsTo(models.Address);
            Orders.belongsTo(models.Users);
            Orders.hasMany(models.ProductOrders);
        }
    }
    Orders.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        } /* ,
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address_id: {
          type: DataTypes.STRING,
          allowNull: false,
        } */,
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "Orders",
    });
    return Orders;
};
