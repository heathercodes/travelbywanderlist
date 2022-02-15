const faker = require('faker');

const createWanderlists = (i, array) => ({
    name: faker.address.country(),
    id: i,
    user_id: faker.random.arrayElement(array)
});

const createNWanderlists = (n, arr) => {
    return Array.from(Array(n)).map((i) => createWanderlists(i, arr));
};

const createLocations = (i, array) => ({
    wanderlist_id: faker.random.arrayElement(array),
    description: 'a string',
    name: faker.address.city(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    image_url: 'https://upslash.com',
    id: i
});

const createNLocations = (n, arr) => {
    return Array.from(Array(n)).map((i) => createLocations(i, arr));
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
                                        .insert(createNWanderlists(5, ids))
                                        .then((wanderlist_ids) => {
                                            const ids = wanderlist_ids.map((list) => list.id);
                                            return knex('locations').insert(
                                                createNLocations(20, ids)
                                            );
                                        });
                                });
                        });
                });
        });
};
