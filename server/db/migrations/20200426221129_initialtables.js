exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('name');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    }).createTable('accounts', table => {
        table.increments();
        table.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users');
        table.string('name');
        table.string('password');
        table.string('email');
    }).createTable('wanderlists', table => {
        table.increments();
        table.integer('user_id')
            .unsigned()
            // .notNullable()
            .references('id')
            .inTable('users');
        table.string('name');
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    }).createTable('locations', table => {
        table.increments();
        table.integer('wanderlist_id')
            .unsigned()
            // .notNullable()
            .references('id')
            .inTable('wanderlists');
        table.string('name');
        table.integer('latitude')
        table.integer('longitude')
        table.text('image_url')
        table.text('description')
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('locations')
        .dropTable('wanderlists')
        .dropTable('accounts')
        .dropTable('users')
};
