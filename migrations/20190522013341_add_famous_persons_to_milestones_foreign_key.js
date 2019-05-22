
exports.up = function(knex, Promise) {
  return knex.schema.table('milestones', function(table)
    {
      table.integer('person_id');
      table.foreign('person_id').references('famous_people.id');
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones');
};
