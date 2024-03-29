module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: 'localhost',
            user: 'traveladmin',
            password: process.env.POSTGRES_PASSWORD,
            database: 'travelbywanderlistdb',
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

    test: {
        client: 'postgresql',
        connection: {
            host: process.env.DATABASE_HOST || 'localhost',
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
    },

    production: {}
};
