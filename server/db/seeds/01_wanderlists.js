const faker = require('faker');

const createWanderlists = (array) => ({
    name: faker.address.country(),
    id: faker.random.number(),
    user_id: faker.random.arrayElement(array)
});

const createNWanderlists = (n, arr) => {
    return Array.from(Array(n)).map(() => createWanderlists(arr));
};

const createLocations = (array) => ({
    wanderlist_id: faker.random.arrayElement(array),
    name: faker.address.city(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    id: faker.random.number()
});

const createNLocations = (n, arr) => {
    return Array.from(Array(n)).map(() => createLocations(arr));
};

const createUsers = () => ({
    id: faker.random.number(),
    email: faker.internet.email(),
    name: faker.name.findName(),
    password: 'password'
});

const createNUsers = (n) => {
    return Array.from(Array(n)).map(() => createUsers());
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
