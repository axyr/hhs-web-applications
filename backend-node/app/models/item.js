'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            models.Item.belongsTo(models.Collection);
            models.Item.belongsTo(models.Category);
        }
    }

    Item.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Item',
    });
    return Item;
};