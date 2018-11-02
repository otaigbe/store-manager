import pg from 'pg';

const config = {
  connectionString: process.env.DATABASE_URL,
  ssl: true,
};
const pool = new pg.Pool(config);
export default pool;
