import Knex from 'knex';

async function createTestDatabase(): Promise<any> {
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
        await knex.raw(`CREATE DATABASE test`);
    } catch (error: any) {
        throw new Error(error);
    } finally {
        await knex.destroy();
    }
}

// Seed the database with schema and data
async function seedTestDatabase(): Promise<any> {
    const knex = Knex({
        client: 'postgresql',
        connection: {
            user: 'postgres',
            password: 'postgres',
            database: 'test',
            port: 5432
        },
        migrations: {
            directory: './db/migrations',
            tableName: 'migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    });

    try {
        await knex.migrate.latest();
        await knex.seed.run();
    } catch (error: any) {
        console.log('seeding failed', error);
        throw new Error(error);
    } finally {
        await knex.destroy();
    }
}

module.exports = async (): Promise<void> => {
    try {
        await createTestDatabase();
        await seedTestDatabase();
        console.log('Test database created successfully');
    } catch (error) {
        console.log('test database failed', error);
        process.exit(1);
    }
};
