'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Items', [
            {
                'id': 1,
                'name': 'Head first design patterns',
                'img': '/collections/books/images/head-first-design-patterns.jpg',
                'collectionId': 1,
                'categoryId': 1
            },
            {
                'id': 2,
                'name': 'User stories applied',
                'img': '/collections/books/images/user-stories-applied.jpg',
                'collectionId': 1,
                'categoryId': 1
            },
            {
                'id': 3,
                'name': 'Web security for developers',
                'img': '/collections/books/images/web-security-for-developers.jpg',
                'collectionId': 1,
                'categoryId': 3
            },
            {
                'id': 4,
                'name': 'Domain driven design distilled',
                'img': '/collections/books/images/domain-driven-design-distilled.jpg',
                'collectionId': 1,
                'categoryId': 1
            },
            {
                'id': 5,
                'name': 'Grokking algorithms',
                'img': '/collections/books/images/grokking-algorithms.jpg',
                'collectionId': 1,
                'categoryId': 2
            },
            {
                'id': 6,
                'name': 'Hacking apis',
                'img': '/collections/books/images/hacking-apis.jpg',
                'collectionId': 1,
                'categoryId': 3
            },
            {
                'id': 7,
                'name': 'Armaldo',
                'img': '/collections/pokemon/images/armaldo.webp',
                'collectionId': 2,
                'categoryId': 4
            },
            {
                'id': 8,
                'name': 'Dark Celebi',
                'img': '/collections/pokemon/images/dark-celebi-hidden-legends-hl-4.webp',
                'collectionId': 2,
                'categoryId': 4
            },
            {
                'id': 9,
                'name': 'Elgyem',
                'img': '/collections/pokemon/images/elgyem.webp',
                'collectionId': 2,
                'categoryId': 8
            },
            {
                'id': 10,
                'name': 'Gardevoir',
                'img': '/collections/pokemon/images/gardevoir.webp',
                'collectionId': 2,
                'categoryId': 8
            },
            {
                'id': 11,
                'name': 'Keldeo',
                'img': '/collections/pokemon/images/keldeo.webp',
                'collectionId': 2,
                'categoryId': 7
            },
            {
                'id': 12,
                'name': 'Kirlia',
                'img': '/collections/pokemon/images/kirlia.webp',
                'collectionId': 2,
                'categoryId': 8
            },
            {
                'id': 13,
                'name': 'Lanturn',
                'img': '/collections/pokemon/images/lanturn.webp',
                'collectionId': 2,
                'categoryId': 5
            },
            {
                'id': 14,
                'name': 'Misdreavus',
                'img': '/collections/pokemon/images/misdreavus.webp',
                'collectionId': 2,
                'categoryId': 8
            },
            {
                'id': 15,
                'name': 'Mismagius',
                'img': '/collections/pokemon/images/mismagius.webp',
                'collectionId': 2,
                'categoryId': 8
            },
            {
                'id': 16,
                'name': 'Ninetales',
                'img': '/collections/pokemon/images/ninetales.webp',
                'collectionId': 2,
                'categoryId': 6
            },
            {
                'id': 17,
                'name': 'Palossand',
                'img': '/collections/pokemon/images/palossand.webp',
                'collectionId': 2,
                'categoryId': 6
            },
            {
                'id': 18,
                'name': 'Pikachu',
                'img': '/collections/pokemon/images/pikachu.webp',
                'collectionId': 2,
                'categoryId': 5
            },
            {
                'id': 19,
                'name': 'Sandygast',
                'img': '/collections/pokemon/images/sandygast.webp',
                'collectionId': 2,
                'categoryId': 6
            },
            {
                'id': 20,
                'name': 'Relicanth',
                'img': '/collections/pokemon/images/relicanth.webp',
                'collectionId': 2,
                'categoryId': 7
            },
            {
                'id': 21,
                'name': 'Arcanine',
                'img': '/collections/pokemon/images/arcanine.webp',
                'collectionId': 2,
                'categoryId': 7
            },
            {
                'id': 22,
                'name': 'Stunfisk',
                'img': '/collections/pokemon/images/stunfisk.webp',
                'collectionId': 2,
                'categoryId': 5
            },
            {
                'id': 23,
                'name': 'Sunflora',
                'img': '/collections/pokemon/images/sunflora.webp',
                'collectionId': 2,
                'categoryId': 4
            },
            {
                'id': 24,
                'name': 'Ursaluna V',
                'img': '/collections/pokemon/images/ursaluna_v.webp',
                'collectionId': 2,
                'categoryId': 7
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Items', null, {});
    }
};