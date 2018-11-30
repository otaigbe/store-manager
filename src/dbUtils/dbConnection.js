import pg from 'pg';
import env from 'dotenv';

env.config();
const config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
};
const pool = new pg.Pool(config);

export default pool;
