import { queries, pool } from './queries/queries';

pool.connect(async (err, client) => {
  if (err) console.log(err);
  try {
    const results = await client.query('select * from products');
    console.log(results.rows);
  } catch (error) {
    console.log(error);
  }
  process.exit();
});
