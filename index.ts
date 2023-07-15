import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import sequelize from './src/models';

import route from './src/routes';
const { PORT } = process.env;

dotenv.config();

//db connection
sequelize
  .authenticate()
  .then(async () => {
    await sequelize.sync();
    console.log('Db successfully connected');
  })
  .catch((err) => console.log(`db connection error ${err.message}`));

const app: Application = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.json({
    limit: '2mb'
  })
);

app.use(cors());

app.use(route);

app.listen(PORT, () => {
  console.log(`Back-end project started http://localhost:${PORT}`);
});
