"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Review extends sequelize_1.Model {
        /*     user_id!: number;
        product_id!: number; */
        static associate(models) {
            Review.belongsTo(models.Users);
            Review.belongsTo(models.Products);
        }
    }
    Review.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        rating: {
            type: DataTypes.INTEGER,
        },
        /*       user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        }, */
    }, {
        sequelize,
        modelName: "Review",
    });
    return Review;
};
