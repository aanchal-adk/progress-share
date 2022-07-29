import Knex from 'knex';
import config from './knexfile';

require('dotenv').config();

// need to use NODE_ENV instead of hardcode
const db = Knex(config['development']);

export default db;
