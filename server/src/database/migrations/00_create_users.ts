import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable;
        table.integer('age').notNullable;
        table.string('gender').notNullable;
        table.float('latitude').notNullable;
        table.float('longitude').notNullable;
        table.boolean('infected').notNullable;
        table.integer('points').notNullable;
        table.integer('reports').notNullable; //amount of infected repors for the user
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('users');
}