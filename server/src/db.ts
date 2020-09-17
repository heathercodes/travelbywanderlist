import Knex from 'knex';

const connections = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            port: Number(process.env.DATABASE_PORT)
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './db/migrations',
            tableName: 'migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    },
    test: {
        client: 'pg',
        // debug: true,
        connection: {
            host: 'localhost',
            user: '',
            password: '',
            database: 'postgres',
            port: 5432
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './db/migrations',
            tableName: 'migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    },
    production: {
        client: 'pg',
        connection: {
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            port: Number(process.env.DATABASE_PORT)
        }
    }
};

const config = connections['test'];
const db = Knex(config);

export { db };
