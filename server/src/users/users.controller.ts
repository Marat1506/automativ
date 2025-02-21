import { Controller, Get, Post, Body, Param, Delete, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}



  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('logins')
  async getLogins() {
    return this.usersService.getLogins();
  }

  @Get('tabels')
  getTabel() {
    return this.usersService.getTabels();
  }

  @Get('find')
  findOne(@Query('login') login: string) {
    return this.usersService.findOne(login);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}