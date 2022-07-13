import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {

  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name', 100).notNullable();
    table.string('last_name', 100).notNullable();
    table.string('username', 100).unique().notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('password', 255).notNullable();
    table.boolean('is_email_verified').notNullable().defaultTo(false);
    table.boolean('is_active').notNullable().defaultTo(false);
    table.integer('points').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {

  return knex.schema.dropTable('users');
}
