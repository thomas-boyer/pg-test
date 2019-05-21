const settings = require('./settings');
const knex = require ('knex')(
  {
    client: 'pg',
    connection:
    {
      user     : settings.user,
      password : settings.password,
      database : settings.database,
      host     : settings.hostname,
      port     : settings.port,
      ssl      : settings.ssl
    }
  });

const args = process.argv.slice(2);

function formatDate(date)
{
  return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
}

function formatResults(results)
{
  let result = '';
  for (resultIndex in results)
  {
    result += `- ${parseInt(resultIndex) + 1}: ${results[resultIndex].first_name} ${results[resultIndex].last_name}, born '${formatDate(results[resultIndex].birthdate)}'\n`
  }
  return result;
}

console.log('Inserting ...');

knex('famous_people').insert(
  {
    first_name: args[0],
    last_name: args[1],
    birthdate: new Date(args[2])
  })
  .asCallback( function(err, insertedRow)
    {
      if (err) console.log('Error!!');

      console.log('Insertion successful');
      knex.destroy();
    });
