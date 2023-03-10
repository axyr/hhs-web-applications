const consts = require('../../framework/consts.js');
const {Category} = require('../models');

const categories = {};

categories.index = async (req, res) => {

    const categories = await Category.findAll({raw: true, nest: true});

    res.status(consts.HTTP_OK).json(categories);
};

categories.create = async (req, res) => {

    const category = await Category.create(req.body);

    res.status(consts.HTTP_CREATED).json(category.toJSON());
};

categories.show = async (req, res) => {

    const category = await Category.findByPk(req.params.id);

    if (category) {
        return res.status(consts.HTTP_OK).json(category.toJSON());
    }

    return res.status(consts.HTTP_NOT_FOUND).json();
};

categories.update = async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (category) {
        await category.update(req.body);
        await category.save();
        await category.reload();
        return res.status(consts.HTTP_OK).json(category.toJSON());
    }

    return res.status(consts.HTTP_NOT_FOUND).json();
};

categories.destroy = async (req, res) => {
    const category = await Category.findByPk(req.params.id);

    if (category) {
        await category.destroy();
    }

    res.status(consts.HTTP_NO_CONTENT).json();
};

module.exports = categories;