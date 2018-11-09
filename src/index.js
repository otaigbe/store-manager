import express from 'express';
import dotenv from 'dotenv';
import versions from './controller/api/versions';

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./UI'));

app.use('/', versions);


const port = process.env.PORT || 6600;
const server = app.listen(port, () => { console.log(`app running on ${port}...`); });

export default server;
