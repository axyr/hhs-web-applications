const consts = require('../../framework/consts.js');
const {Collection} = require('../models');

module.exports = {
    index: async (req, res) => {
        const collections = await Collection.findAll({raw: true, nest: true});

        res.status(consts.HTTP_OK).json(collections);
    },

    create: async (req, res) => {
        const collection = await Collection.create(req.body);

        res.status(consts.HTTP_CREATED).json(collection.toJSON());
    },

    show: async (req, res) => {
        const collection = await Collection.findByPk(req.params.id);

        if (collection) {
            return res.status(consts.HTTP_OK).json(collection.toJSON());
        }

        return res.status(consts.HTTP_NOT_FOUND).json({});
    },

    update: async (req, res) => {
        const collection = await Collection.findByPk(req.params.id);

        if (collection) {
            await collection.update(req.body);
            await collection.save();
            await collection.reload();
            return res.status(consts.HTTP_OK).json(collection.toJSON());
        }

        return res.status(consts.HTTP_NOT_FOUND).json({});
    },

    destroy: async (req, res) => {
        const collection = await Collection.findByPk(req.params.id);

        if (collection) {
            await collection.destroy();
        }

        res.status(consts.HTTP_NO_CONTENT).json();
    }
};