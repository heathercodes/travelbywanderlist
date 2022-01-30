import Knex from 'knex';
import connections from '../knexfile';
const env = process.env.NODE_ENV || 'development';

export let config = {};

switch (env) {
    case 'dev':
    case 'development':
        config = connections.development;
        break;
    case 'test':
    case 'testing':
        config = connections.test;
        break;
    case 'prod':
    case 'production':
        config = connections.test;
        break;
    default:
        config = connections.development;
}

const db = Knex(config);

export { db };
export const secret = process.env.JWT_SECRET || 'jwttokendev';
