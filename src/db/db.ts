import Knex from 'knex';
import config from './knexfile';

require('dotenv').config();

const db = Knex(config['development']);

export default db;
