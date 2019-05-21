const pg = require("pg");
const settings = require("./settings"); // settings.json
const args = process.argv.slice(2);


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

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

const query =
{
  text: 'SELECT * FROM famous_people WHERE first_name LIKE $1 OR last_name LIKE $1',
  values: args
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  console.log("Searching ...");
  client.query(query, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    let resultLog = `Found ${result.rows.length} people by the name '${args}':\n`;
    resultLog += formatResults(result.rows);
    console.log(resultLog);

    client.end();
  });
});
