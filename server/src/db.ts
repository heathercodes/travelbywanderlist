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
        connection: {
            host: 'postgresdb',
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            port: Number(process.env.DATABASE_PORT)
        },
        migrations: {
            directory: './db/migrations',
            tableName: 'migrations'
        },
        seeds: {
            directory: './db/seeds'
        }
    }
};

const config = process.env.NODE_ENV === 'test' ? connections.test : connections.development;
const db = Knex(config);

export { db };
