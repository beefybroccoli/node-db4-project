
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('orders').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('orders').insert([
        {id: 1, order_id:1, product_id:1, quantity:5, status:"pending",user_id:1},
        {id: 2, order_id:1, product_id:2, quantity:5, status:"pending",user_id:2},
        {id: 3, order_id:2, product_id:3, quantity:5, status:"pending",user_id:3},
        {id: 4, order_id:2, product_id:4, quantity:5, status:"pending",user_id:4},
        {id: 5, order_id:3, product_id:5, quantity:5, status:"pending",user_id:5},
      ]);
    });
};
