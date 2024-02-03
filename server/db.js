import mysql from 'mysql2';
import util from 'util';

function createDbConnection(user, host, database, password) {
  const connection = mysql.createConnection({
    user,
    host,
    database,
    password,
  });

  connection.connect((error) => {
    if (error) {
      console.log('ERROR: ', error.message);
    } else {
      console.log('MySQL is connected...');
    }
  });
  return connection;
}

const connection = createDbConnection(
  process.env.MYSQL_USER,
  process.env.MYSQL_HOST,
  process.env.DATABASE,
  process.env.MYSQL_PASSWORD
);

connection.queryAsync = util.promisify(connection.query).bind(connection);
export { connection, createDbConnection };
