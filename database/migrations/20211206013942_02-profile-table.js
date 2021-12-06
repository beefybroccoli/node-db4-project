
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("profiles", table=>{
        table.increments("id");
        table.string("first_name").notNull();
        table.string("middle_name");
        table.string("last_name").notNull();
        table.string("email").notNull();
        table.string("user_type").notNull();
        table.integer("user_id").notNull();
        table.foreign("user_id").references("id").inTable("users");
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("profiles");
};
