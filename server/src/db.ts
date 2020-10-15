import Knex from 'knex';
import connections from '../knexfile';

const config = process.env.NODE_ENV === 'test' ? connections.test : connections.development;
const db = Knex(config);

export { db };
