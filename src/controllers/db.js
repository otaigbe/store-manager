import pg from 'pg';


const config = {
 
 
  // user: process.env.PGUSER,
  // database: process.env.PGDATABASE,
  // password: process.env.PGPASSWORD,
  // port: process.env.PGPORT,
  host: 'ec2-107-22-189-136.compute-1.amazonaws.com',
  // eslint-disable-next-line indent
  database: 'dcg576259t40m0',
  user: 'eiswqjxnuvwwvx',
  port: 5432,
  password: '02fa9f8ade88e87c5f99e148f36f42c92380c7f68dfc856e935351150f0f9723',
  // 'Heroku CLI': 'heroku pg:psql postgresql-graceful-64992 --app fathomless-tor-14107',
  // Database: yhwwdcrl,
  // Password: tQPlgiUTBlh-8a7o6ZbFVYD7zP_hExsC,
  // user:'@elmer.db.elephantsql.com'
};

const pool = new pg.Pool(config);
export default pool;
