import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.table('tracker_types')
  .insert([
    {
      name: 'Goal'
    },
    {
      name: 'Habit'
    },
    {
      name: 'Skill'
    }
  ]);

}


export async function down(knex: Knex): Promise<void> {
  return knex.table('tracker_types').truncate();
}

