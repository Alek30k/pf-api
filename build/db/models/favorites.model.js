"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Favorites extends sequelize_1.Model {
        static associate(models) {
            Favorites.belongsTo(models.Users);
            Favorites.belongsTo(models.Products);
        }
    }
    Favorites.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        sequelize,
        modelName: "Favorites",
    });
    return Favorites;
};
