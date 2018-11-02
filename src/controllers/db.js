import pg from 'pg';

const config = {
  // user: process.env.PGUSER,
  // database: process.env.PGDATABASE,
  // password: process.env.PGPASSWORD,
  // port: process.env.PGPORT,
  Host: 'ec2-107-22-189-136.compute-1.amazonaws.com',
  // eslint-disable-next-line indent
   Database: 'dcg576259t40m0',
  User: 'eiswqjxnuvwwvx',
  Port: 5432,
  Password: '02fa9f8ade88e87c5f99e148f36f42c92380c7f68dfc856e935351150f0f9723',
};

const pool = new pg.Pool(config);
export default pool;
