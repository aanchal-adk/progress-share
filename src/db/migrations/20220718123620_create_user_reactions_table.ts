import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_reactions', (table) => {
    table.increments('id').primary();
    table.integer('reacter_user_id').notNullable();
    table.integer('tracker_id').notNullable();
    table.integer('reaction_type_id').notNullable();
    table.integer('count').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user_reactions');
}
