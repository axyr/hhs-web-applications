'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Collection extends Model {
        static associate(models) {
            models.Collection.hasMany(models.Item);
            models.Collection.hasMany(models.Category);
        }
    }

    Collection.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Collection',
    });
    return Collection;
};