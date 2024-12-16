import mysql from "mysql2/promise";
import { configDotenv } from "dotenv";
configDotenv();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
