'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Collections', [
            {
                'id': 1,
                'name': 'Books',
                'owner': 'Martijn van Nieuwenhoven',
                'logo': '/collections/books/assets/logo.png',
                'brandColor': '#0283ff'
            },
            {
                'id': 2,
                'name': 'Pokemon',
                'owner': 'Pieter van Nieuwenhoven',
                'logo': '/collections/pokemon/assets/logo.png',
                'brandColor': '#ff0088'
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Collections', null, {});
    }
};