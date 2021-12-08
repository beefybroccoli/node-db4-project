
exports.up = function(knex, Promise) {
  return knex.schema 
    .createTable("users", table=>{
        table.increments("id");
        table.string("username").notNull().unique();
        table.string("password").notNull();
    })
  
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("users");
};
