import pg from 'pg';

const config = {
  user: 'postgres',
  database: 'store_manager',
  password: 'mar889003',
  port: 5432,
};

const pool = new pg.Pool(config);
export default pool;
