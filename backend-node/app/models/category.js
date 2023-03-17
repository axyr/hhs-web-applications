'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            models.Category.hasMany(models.Item, {
                as: 'items',
                foreignKey: 'id'
            });
            models.Category.belongsTo(models.Collection, {
                as: 'collections',
                foreignKey: 'collectionId'
            });
        }
    }

    Category.init({
        name: DataTypes.STRING,
        itemCount: DataTypes.INTEGER
    }, {
        sequelize,
        timestamps: false,
    });
    return Category;
};