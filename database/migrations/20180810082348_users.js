exports.up = function(knex) {
  return knex.schema.createTable('Users', users => {
    users.increments('UserID');

    users
      .string('UserName', 255)
      .notNullable()
      .unique();
    users.string('UserPassword', 255).notNullable();

    users.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Users');
};
