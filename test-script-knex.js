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

const arg = process.argv.slice(2)[0];

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

console.log('Searching ...');

knex.select('*').from('famous_people')
  .where('first_name', 'like', arg)
  .orWhere('last_name', 'like', arg)
  .asCallback( function(err, rows)
    {
      if (err) console.log("Error!!");

      console.log(formatResults(rows));
      knex.destroy();
    });