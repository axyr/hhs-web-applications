'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Categories', [
            {
                'id': 1,
                'collectionId': 1,
                'name': 'Coding and architecture',
                'itemCount': 0
            },
            {
                'id': 2,
                'collectionId': 1,
                'name': 'Algorithms',
                'itemCount': 0
            },
            {
                'id': 3,
                'collectionId': 1,
                'name': 'Security',
                'itemCount': 0
            },
            {
                'id': 4,
                'collectionId': 2,
                'name': 'Green',
                'itemCount': 0
            },
            {
                'id': 5,
                'collectionId': 2,
                'name': 'Yellow',
                'itemCount': 0
            },
            {
                'id': 6,
                'collectionId': 2,
                'name': 'Orange',
                'itemCount': 0
            },
            {
                'id': 7,
                'collectionId': 2,
                'name': 'Blue',
                'itemCount': 0
            },
            {
                'id': 8,
                'collectionId': 2,
                'name': 'Purple',
                'itemCount': 0
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Categories', null, {});
    }
};