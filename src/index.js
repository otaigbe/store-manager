import express from 'express';
import dotenv from 'dotenv';
import maincontroller from './mainrouter/mainController';
import authController from './mainrouter/authController';
import 'body-parser';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./UI'));
app.use(express.json());

app.use('/api/v1', maincontroller);
app.use('/auth', authController);


const port = process.env.PORT || 4000;
const server = app.listen(port, () => { console.log(`app running on ${port}...`); });

export default server;
