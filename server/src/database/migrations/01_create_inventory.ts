import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('inventory', table => {
        table.increments('id').primary();
        table.integer('water').notNullable;
        table.integer('weapon').notNullable;
        table.integer('medicine').notNullable;
        table.integer('food').notNullable;
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('class_schedule');
}
