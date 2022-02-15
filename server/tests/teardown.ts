import Knex from 'knex';

module.exports = async (): Promise<void> => {
    const knex = Knex({
        client: 'postgresql',
        connection: {
            user: 'postgres',
            password: 'postgres',
            port: 5432
        }
    });

    try {
        await knex.raw(`DROP DATABASE IF EXISTS test`);
    } catch (error) {
        console.log('test db failed to destroy', error);
        process.exit(1);
    }
};
