exports.up = function (knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments();
            table.string('name');
            table.string('password').notNullable();
            table.string('email').notNullable().unique();
            table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
        })
        .createTable('wanderlists', (table) => {
            table.increments();
            table
                .integer('user_id')
                .unsigned()
                // .notNullable()
                .references('id')
                .inTable('users');
            table.string('name');
            table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
            table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
        })
        .createTable('locations', (table) => {
            table.increments();
            table
                .integer('wanderlist_id')
                .unsigned()
                // .notNullable()
                .references('id')
                .inTable('wanderlists');
            table.string('name');
            table.float('latitude', 14, 10).notNullable();
            table.float('longitude', 14, 10).notNullable();
            table.text('image_url');
            table.text('description');
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable('locations').dropTable('wanderlists').dropTable('users');
};
