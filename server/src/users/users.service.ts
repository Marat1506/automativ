
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    return this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(login: string): Promise<User> {
    const user = await this.userModel.findOne({ where: { login } });
    console.log('Найденный пользователь:', user);
    return user;
  }

  async getTabels(): Promise<string[]> {
    const users = await this.userModel.findAll({ attributes: ['tabel'] });
    return users.map((user) => user.tabel);
  }

  async getLogins(): Promise<string[]> {
    const users = await this.userModel.findAll({ attributes: ['login'] });
    return users.map((user) => user.login);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userModel.findByPk(id);
    await user.destroy();
  }
}