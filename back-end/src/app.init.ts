import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable()
export class AppInit implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppInit.name);
  constructor(private usersService: UsersService) {}

  async onApplicationBootstrap() {
    try {
      await this.usersService.createUser({
        username: 'admin',
        password: 'admin',
        firstName: 'admin',
        lastName: 'root',
        email: 'admin@gmail.com',
        mobile: '000000000',
        birthday: new Date('2025-01-01'),
      });
    } catch (error) {
      this.logger.log(error.message);
    }
  }
}
