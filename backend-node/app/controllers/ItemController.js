const consts = require('../../framework/consts.js');
const {Item} = require('../models');

const items = {};

items.index = async (req, res) => {

    const items = await Item.findAll({raw: true, nest: true});

    res.status(consts.HTTP_OK).json(items);
};

items.create = async (req, res) => {

    const item = await Item.create(req.body);

    res.status(consts.HTTP_CREATED).json(item.toJSON());
};

items.show = async (req, res) => {

    const item = await Item.findByPk(req.params.id);

    if (item) {
        return res.status(consts.HTTP_OK).json(item.toJSON());
    }

    return res.status(consts.HTTP_NOT_FOUND).json();
};

items.update = async (req, res) => {
    const item = await Item.findByPk(req.params.id);

    if (item) {
        await item.update(req.body);
        await item.save();
        await item.reload();
        return res.status(consts.HTTP_OK).json(item.toJSON());
    }

    return res.status(consts.HTTP_NOT_FOUND).json();
};

items.destroy = async (req, res) => {
    const item = await Item.findByPk(req.params.id);

    if (item) {
        await item.destroy();
    }

    res.status(consts.HTTP_NO_CONTENT).json();
};

module.exports = items;