import { Options, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  POSTGRES_DB_NAME,
  POSTGRES_DB_USERNAME,
  POSTGRES_DB_HOST,
  POSTGRES_DB_PORT,
  POSTGRES_DB_PASSWORD
} = process.env;

const options: Options = {
  username: POSTGRES_DB_USERNAME,
  password: POSTGRES_DB_PASSWORD,
  database: POSTGRES_DB_NAME,
  port: POSTGRES_DB_PORT as unknown as number,
  dialect: 'postgres',
  host: POSTGRES_DB_HOST,
  sync: { alter: true, logging: false },
  logging: false
};

const sequelize = new Sequelize(options);

export default sequelize;
