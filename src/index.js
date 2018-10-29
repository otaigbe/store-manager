import express from 'express';
import products from './routes/products';
import sales from './routes/sales';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./UI'));
app.use(express.json());


app.use('/api/v1/products', products);
app.use('/api/v1/sales', sales);
const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`app running on ${port}...`); });

/* const stop = function stop() {
  server.close();
}; */
export default app;
// export { app, stop };
