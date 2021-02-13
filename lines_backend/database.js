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
    'root',
    'localhost',
    'color_lines',
    '123456'
);

connection.queryAsync = util.promisify(connection.query).bind(connection);
export { connection, createDbConnection };
