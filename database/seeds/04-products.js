
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {id: 1, name:"color shirt",description:"a very colorful shirt", price:11.99},
        {id: 2, name:"pencil case",description:"a very strong case", price:11.99},
        {id: 3, name:"water bottle",description:"a long lasting bottle", price:11.99},
        {id: 4, name:"container box",description:"a wood box", price:11.99},
        {id: 5, name:"fish tank",description:"this tank can hold 5 fishes", price:11.99},
      ]);
    });
};
