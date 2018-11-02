import pg from 'pg';

const config = {
  //user: process.env.PGUSER,
  database: process.env.DATABASE_URL
  //password: process.env.PGPASSWORD,
  //port: process.env.PGPORT,
};

const pool = new pg.Pool(config);
export default pool;
