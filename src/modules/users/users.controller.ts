import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@Request() req) {
    return this.usersService.findOneUser(req.user.id);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(req.user.id, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@Request() req) {
    return this.usersService.removeUser(req.user.id);
  }
}
