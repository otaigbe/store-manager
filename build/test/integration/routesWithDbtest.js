// import pg from 'pg';

// const config = {
//     user: 'postgres',
//     database: 'store-manager_test',
//     password: 'mar889003',
//     port: 5432,
//   };
// describe('/auth/signup', () => {
//   beforeEach(() => {
//     import {app} from '../../src/index';
//   });
//   afterEach(() =>{
//     app.close();
//   });
//   describe('connect to Db', () => {
//    it('should connect to the database' () => {
//     const pool = new pg.Pool(config);

//     pool.connect()
//       .then((client) => {
//         res.json({
//           success: 'connected to the db',
//         });
//       })
//       .catch((err) => {
//         console.log(err.message);
//         res.json({ error: err.message });
//       });
//    });
//   });
// });
"use strict";