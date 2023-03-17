'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Collection extends Model {
        static associate(models) {
            models.Collection.hasMany(models.Item, {
                as: 'items'
            });
            models.Collection.hasMany(models.Category, {
                as: 'categories'
            });
        }
    }

    Collection.init({
        name: DataTypes.STRING,
        owner: DataTypes.STRING,
        logo: DataTypes.STRING,
        brandColor: DataTypes.STRING,
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Collection',
    });

    return Collection;
};