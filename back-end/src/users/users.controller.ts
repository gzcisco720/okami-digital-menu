import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
// import { Roles } from 'src/auth/decorators';
// import { Role } from 'src/auth/enums';

@Controller('/api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Roles(Role.SUPER_ADMIN)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // @Roles(Role.USER)
  @Get(':username')
  async findUserByUsername(@Param('username') username: string) {
    return this.usersService.findUserByUsername(username, false);
  }
}
