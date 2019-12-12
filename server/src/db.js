const Knex = require('knex');
const configuration = require('../knexfile');

const KnexInstance = Knex(configuration);

module.exports = KnexInstance;
