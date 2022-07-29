import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.table('tracker_status_types')
  .insert([
    {
      name: 'In progress'
    },
    {
      name: 'Complete'
    },
    {
      name: 'Closed'
    }
  ]);

}

export async function down(knex: Knex): Promise<void> {
  return knex.table('tracker_status_types').truncate();
}
