const consts = require('../../framework/consts.js');
const {Category, Collection} = require('../models');

module.exports = {
    index: async (req, res) => {
        const collection = await Collection.findByPk(req.params.collectionId);

        if (collection) {
            return res.status(consts.HTTP_OK).json(await collection.getCategories());
        }

        return res.status(consts.HTTP_NOT_FOUND).json({});
    },

    create: async (req, res) => {
        const category = await Category.create(req.body);

        res.status(consts.HTTP_CREATED).json(category.toJSON());
    },

    show: async (req, res) => {
        const category = await Category.findByPk(req.params.id);

        if (category) {
            return res.status(consts.HTTP_OK).json(category.toJSON());
        }

        return res.status(consts.HTTP_NOT_FOUND).json({});
    },

    update: async (req, res) => {
        const category = await Category.findByPk(req.params.id);

        if (category) {
            await category.update(req.body);
            await category.save();
            await category.reload();
            return res.status(consts.HTTP_OK).json(category.toJSON());
        }

        return res.status(consts.HTTP_NOT_FOUND).json({});
    },

    destroy: async (req, res) => {
        const category = await Category.findByPk(req.params.id);

        if (category) {
            await category.destroy();
        }

        res.status(consts.HTTP_NO_CONTENT).json();
    }
};