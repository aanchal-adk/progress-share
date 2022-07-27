import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tracker_status_types', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tracker_status_types');
}

