'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            models.Item.belongsTo(models.Collection, {
                as: 'collection',
                foreignKey: 'collectionId'
            });
            models.Item.belongsTo(models.Category, {
                as: 'category',
                foreignKey: 'categoryId'
            });
        }
    }

    Item.init({
        name: DataTypes.STRING,
        img: DataTypes.STRING,
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Item',
    });
    return Item;
};