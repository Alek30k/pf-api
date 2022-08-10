"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Address extends sequelize_1.Model {
        static associate(models) {
            Address.hasMany(models.Orders);
        }
    }
    Address.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        locality: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apartment_floor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "Address",
    });
    return Address;
};
