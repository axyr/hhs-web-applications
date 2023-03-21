'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Items', [
            {
                'name': 'BDD in Action',
                'img': '/collections/books/images/bdd-in-action.jpg',
                'collectionId': 1,
                'categoryId': 3
            },
            {
                'name': 'Clean Architecture',
                'img': '/collections/books/images/clean-architecture.jpg',
                'collectionId': 1,
                'categoryId': 1
            },
            {
                'name': 'Clean Code',
                'img': '/collections/books/images/clean-code.jpg',
                'collectionId': 1,
                'categoryId': 1
            },
            {
                'name': 'Head first design patterns',
                'img': '/collections/books/images/head-first-design-patterns.jpg',
                'collectionId': 1,
                'categoryId': 1
            },
            {
                'name': 'User stories applied',
                'img': '/collections/books/images/user-stories-applied.jpg',
                'collectionId': 1,
                'categoryId': 1
            },
            {
                'name': 'Web security for developers',
                'img': '/collections/books/images/web-security-for-developers.jpg',
                'collectionId': 1,
                'categoryId': 3
            },
            {
                'name': 'Code that fits in your head',
                'img': '/collections/books/images/code-that-fits-in-your-head.jpg',
                'collectionId': 1,
                'categoryId': 1
            },
            {
                'name': 'Common sense guide to data structures',
                'img': '/collections/books/images/common-sense-guide-to-data-structures.jpg',
                'collectionId': 1,
                'categoryId': 2
            },
            {
                'name': 'Data strucures and algorithms in Java',
                'img': '/collections/books/images/data-structures-and-algorithms-in-java.jpg',
                'collectionId': 1,
                'categoryId': 2
            },
            {
                'name': 'Designing hexagonal architecture with Java',
                'img': '/collections/books/images/designing-hexagonal-architecture-with-java.jpg',
                'collectionId': 1,
                'categoryId': 1
            },
            {
                'name': 'Domain driven design distilled',
                'img': '/collections/books/images/domain-driven-design-distilled.jpg',
                'collectionId': 1,
                'categoryId': 1
            },
            {
                'name': 'Grokking algorithms',
                'img': '/collections/books/images/grokking-algorithms.jpg',
                'collectionId': 1,
                'categoryId': 2
            },
            {
                'name': 'Hacking apis',
                'img': '/collections/books/images/hacking-apis.jpg',
                'collectionId': 1,
                'categoryId': 3
            },
            {
                'name': 'Armaldo',
                'img': '/collections/pokemon/images/armaldo.webp',
                'collectionId': 2,
                'categoryId': 4
            },
            {
                'name': 'Dark Celebi',
                'img': '/collections/pokemon/images/dark-celebi-hidden-legends-hl-4.webp',
                'collectionId': 2,
                'categoryId': 4
            },
            {
                'name': 'Elgyem',
                'img': '/collections/pokemon/images/elgyem.webp',
                'collectionId': 2,
                'categoryId': 8
            },
            {
                'name': 'Gardevoir',
                'img': '/collections/pokemon/images/gardevoir.webp',
                'collectionId': 2,
                'categoryId': 8
            },
            {
                'name': 'Keldeo',
                'img': '/collections/pokemon/images/keldeo.webp',
                'collectionId': 2,
                'categoryId': 7
            },
            {
                'name': 'Kirlia',
                'img': '/collections/pokemon/images/kirlia.webp',
                'collectionId': 2,
                'categoryId': 8
            },
            {
                'name': 'Lanturn',
                'img': '/collections/pokemon/images/lanturn.webp',
                'collectionId': 2,
                'categoryId': 5
            },
            {
                'name': 'Misdreavus',
                'img': '/collections/pokemon/images/misdreavus.webp',
                'collectionId': 2,
                'categoryId': 8
            },
            {
                'name': 'Mismagius',
                'img': '/collections/pokemon/images/mismagius.webp',
                'collectionId': 2,
                'categoryId': 8
            },
            {
                'name': 'Ninetales',
                'img': '/collections/pokemon/images/ninetales.webp',
                'collectionId': 2,
                'categoryId': 6
            },
            {
                'name': 'Palossand',
                'img': '/collections/pokemon/images/palossand.webp',
                'collectionId': 2,
                'categoryId': 6
            },
            {
                'name': 'Pikachu',
                'img': '/collections/pokemon/images/pikachu.webp',
                'collectionId': 2,
                'categoryId': 5
            },
            {
                'name': 'Sandygast',
                'img': '/collections/pokemon/images/sandygast.webp',
                'collectionId': 2,
                'categoryId': 6
            },
            {
                'name': 'Relicanth',
                'img': '/collections/pokemon/images/relicanth.webp',
                'collectionId': 2,
                'categoryId': 7
            },
            {
                'name': 'Arcanine',
                'img': '/collections/pokemon/images/arcanine.webp',
                'collectionId': 2,
                'categoryId': 7
            },
            {
                'name': 'Stunfisk',
                'img': '/collections/pokemon/images/stunfisk.webp',
                'collectionId': 2,
                'categoryId': 5
            },
            {
                'name': 'Sunflora',
                'img': '/collections/pokemon/images/sunflora.webp',
                'collectionId': 2,
                'categoryId': 4
            },
            {
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