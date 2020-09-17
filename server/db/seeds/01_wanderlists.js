const faker = require('faker');

const wanderlists = [
    {
        name: 'South East Asia'
    },
    {
        name: 'France'
    },
    {
        name: 'Greek Islands'
    },
    {
        name: 'West Coast USA'
    }
];

const createLocations = (array) => ({
    wanderlist_id: faker.random.arrayElement(array),
    name: faker.address.city(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude()
});

const createNLocations = (n, arr) => {
    return Array.from(Array(n)).map(() => createLocations(arr));
};

exports.seed = (knex) => {
    return knex('wanderlists')
        .del()
        .then(() => {
            return knex('wanderlists')
                .returning('id')
                .insert(wanderlists)
                .then((wanderlist_ids) => {
                    return knex('locations').insert(createNLocations(20, wanderlist_ids));
                });
        });
};
