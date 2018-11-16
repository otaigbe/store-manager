import pg from 'pg';
import env from 'dotenv';

env.config();
const db = {};
const config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
};
const config2 = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  // password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
};
// if (process.env.NODE_ENV === 'test') {

//  } else if (process.env.NODE_ENV === 'development') {

// } else if (process.env.NODE_ENV === 'production') {

// }

const pool = new pg.Pool(config);

// db.queryDb = (poolObj, res, query) => {
//   let queryResult = '';
//   poolObj.connect(async (err, client) => {
//     try {
//       queryResult = await client.query(query);
//     } catch (error) {
//       res.status(501).json({
//         message: 'Internal Server error! Couldn"t create an Attendant',
//         ErrorMessage: error.message,
//       });
//     }
//   });
//   return queryResult;
// };
export default pool;
