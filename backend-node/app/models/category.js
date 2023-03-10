'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            models.Category.hasMany(models.Item);
        }
    }

    Category.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};