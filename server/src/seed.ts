import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';
import { User } from './users/user.model';
import * as bcrypt from 'bcryptjs';
import { databaseConfig } from './config/database.config';

async function seed() {
  const sequelize = new Sequelize(databaseConfig);


  await sequelize.authenticate();


  await sequelize.sync({ force: true });


  const users = [
    {
      login: 'Иванов И.Т.',
      tabel: '005',
      password: bcrypt.hashSync('1', 8),
    },
    {
      login: 'Ивано П.Н.',
      tabel: '006',
      password: bcrypt.hashSync('2', 8),
    },
    {
      login: 'Петров А.С.',
      tabel: '007',
      password: bcrypt.hashSync('3', 8),
    },
    {
      login: 'Мирзабалаев М.К.',
      tabel: '008',
      password: bcrypt.hashSync('3', 8),
    },
    {
      login: 'Майк Тайсон',
      tabel: '009',
      password: bcrypt.hashSync('3', 8),
    },
    {
      login: 'ГГ',
      tabel: '010',
      password: bcrypt.hashSync('3', 8),
    },
    {
      login: 'А.А.С.',
      tabel: '011',
      password: bcrypt.hashSync('3', 8),
    },
  ];


  await User.bulkCreate(users);
  console.log('База данных была заполнена');

  await sequelize.close();
}

seed().catch((error) => {
  console.error('Ошибка при заполнении БД:', error);
});