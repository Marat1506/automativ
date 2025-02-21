import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { config } from 'dotenv';

config();
export const databaseConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User],
};