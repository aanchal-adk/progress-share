import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tracker_labels', (table) => {
    table.increments('id').primary();
    table.integer('tracker_id');
    table.integer('label_id');
    table.timestamps(true, true);

  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tracker_labels');
}
