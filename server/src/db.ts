import Knex from 'knex';
import configuration from '../knexfile';

const db = Knex(configuration);

export { db };
