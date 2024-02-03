import mysql from 'mysql2';
import * as util from "util";
import 'dotenv/config'

async function createDbConnection(user, host, database, password) {
  const connection = mysql.createConnection({
    user,
    host,
    password,
  });

  connection.queryAsync = util.promisify(connection.query).bind(connection);

  connection.connect((error) => {
    if (error) {
      console.log('ERROR: ', error.message);
    } else {
      console.log('MySQL is connected...');
    }
  });

  await connection.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`);

  connection.changeUser({ database });

  const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
           id INT AUTO_INCREMENT PRIMARY KEY,
           name VARCHAR(255) NOT NULL,
           email VARCHAR(255) NOT NULL,
           password VARCHAR(255) NOT NULL
          )
  `;

  const createGameTableQuery = `
      CREATE TABLE IF NOT EXISTS game (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            lines_98 JSON,
            FOREIGN KEY (user_id) REFERENCES users(id)
          )
  `;

  try {
    const [usersTableResult] = await connection.queryAsync('SHOW TABLES LIKE "users"');
    if (!usersTableResult?.length) {
      await connection.queryAsync(createUserTableQuery);
      console.log('Users table created successfully');
    } else {
      console.log('Users table already exists');
    }

    const [gameTableResult] = await connection.queryAsync('SHOW TABLES LIKE "game"');
    if (!gameTableResult?.length) {
      await connection.queryAsync(createGameTableQuery);
      console.log('Game table created successfully');
    } else {
      console.log('Game table already exists');
    }
  } catch (error) {
    console.error('Error creating tables:', error.message);
  }

  return connection;
}

async function initializeDatabase() {
  return await createDbConnection(
    process.env.MYSQL_USER,
    process.env.MYSQL_HOST,
    process.env.DATABASE,
    process.env.MYSQL_PASSWORD
  );
}

const connection = await initializeDatabase();
export { connection, createDbConnection };
