
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable("orders", table=>{
            table.increments("id");
            table.integer("order_number").notNull();
            table.integer("product_id").notNull();
            table.integer("quantity").notNull();
            table.string("status").notNull();
            table.integer("user_id").notNull();
            table.foreign("user_id").references("id").inTable("users");
        })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("orders");
};
