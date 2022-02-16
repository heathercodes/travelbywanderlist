const faker = require('faker');

const createWanderlists = (array, i) => ({
    name: faker.address.country(),
    id: i,
    user_id: faker.random.arrayElement(array)
});

const createNWanderlists = (n, arr) => {
    return Array.from(Array(n)).map((i) => createWanderlists(arr, i));
};

const createLocations = (array, i) => ({
    wanderlist_id: faker.random.arrayElement(array),
    name: faker.address.city(),
    description: 'a string',
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    image_url: 'https://unsplash.com',
    id: i
});

const createNLocations = (n, arr) => {
    return Array.from(Array(n)).map((i) => createLocations(arr, i));
};

const createUsers = (i) => ({
    id: i,
    email: faker.internet.email(),
    name: faker.name.findName(),
    password: 'password'
});

const createNUsers = (n) => {
    return Array.from(Array(n)).map((i) => createUsers(i));
};

exports.seed = (knex) => {
    return knex('locations')
        .del()
        .then(() => {
            return knex('wanderlists')
                .del()
                .then(() => {
                    return knex('users')
                        .del()
                        .then(() => {
                            return knex('users')
                                .returning('id')
                                .insert(createNUsers(5))
                                .then((user_ids) => {
                                    const ids = user_ids.map((user) => user.id);
                                    return knex('wanderlists')
                                        .returning('id')
                                        .insert(createNWanderlists(2, ids))
                                        .then((wanderlist_ids) => {
                                            const ids = wanderlist_ids.map((list) => list.id);
                                            return knex('locations').insert(
                                                createNLocations(3, ids)
                                            );
                                        });
                                });
                        });
                });
        });
};
