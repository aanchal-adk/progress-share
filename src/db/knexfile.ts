import type { Knex } from "knex";
require('dotenv').config({ path: '../../.env' });

const config: { [key: string]: Knex.Config } = {

  development: {
    client: "mysql",
    connection: {
      database: process.env.DATABASE,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host:     process.env.DB_HOST,
      ssl: {}
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './migrations'
    }
  },
};

export default config;
