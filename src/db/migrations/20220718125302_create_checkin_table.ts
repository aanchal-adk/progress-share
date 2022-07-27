import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('checkin', (table) => {
    table.increments('id').primary();
    table.integer('tracker_id').notNullable();
    table.integer('day_num').notNullable();
    table.boolean('is_checked_in').notNullable();
    table.boolean('is_repaired').notNullable();
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('checkin');
}

