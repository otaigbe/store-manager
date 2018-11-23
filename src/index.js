import express from 'express';
import dotenv from 'dotenv';
import versions from './controller/api/versions';
import customFunc from './utils/functions';

dotenv.config();
const app = express();
// app.use(express.cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./UI'));

app.use('/', versions);
const port = customFunc.checkAndSwitchEnvironment();

const server = app.listen(port, () => { console.log(`app running on ${port}...`); });

export default server;
