exports.up = function(knex) {
  return knex.schema.createTable('milestones', function(table)
    {
      table.increments('id');
      table.string('description', 100);
      table.date('date_achieved');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('milestones');
};
