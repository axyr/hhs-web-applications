const consts = require('../../framework/consts.js');
const {Item, Collection, Category} = require('../models');

module.exports = {
    index: async (req, res) => {
        const collection = await Collection.findByPk(req.params.collectionId);

        if (collection) {
            const items = await collection.getItems({
                include: {
                    model: Category, as: 'category'
                }
            });

            return res.status(consts.HTTP_OK).json(items);
        }

        return res.status(consts.HTTP_NOT_FOUND).json({});
    },

    create: async (req, res) => {
        const item = await Item.create(req.body);

        res.status(consts.HTTP_CREATED).json(item.toJSON());
    },

    show: async (req, res) => {
        const item = await Item.findByPk(req.params.id);

        if (item) {
            return res.status(consts.HTTP_OK).json(item.toJSON());
        }

        return res.status(consts.HTTP_NOT_FOUND).json({});
    },

    update: async (req, res) => {
        const item = await Item.findByPk(req.params.id);

        if (item) {
            await item.update(req.body);
            await item.save();
            await item.reload();
            return res.status(consts.HTTP_OK).json(item.toJSON());
        }

        return res.status(consts.HTTP_NOT_FOUND).json({});
    },

    destroy: async (req, res) => {
        const item = await Item.findByPk(req.params.id);

        if (item) {
            await item.destroy();
        }

        res.status(consts.HTTP_NO_CONTENT).json();
    }
};