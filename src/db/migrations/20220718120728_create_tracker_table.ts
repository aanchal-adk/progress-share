import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('trackers', (table) => {
    table.increments('id').primary();
    table.integer('userid').notNullable();
    table.string('title', 300).notNullable();
    table.integer('tracker_type_id').notNullable();
    table.integer('total_days').notNullable();
    table.integer('status_id').notNullable();
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('trackers');
}

