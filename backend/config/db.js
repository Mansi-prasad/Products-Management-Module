import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
const pool = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  port: process.env.MYSQL_ADDON_PORT || 3306,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  waitForConnections: true,
  connectionLimit: 10,
});
export default pool.promise();