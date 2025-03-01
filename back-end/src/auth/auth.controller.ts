import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetUsername, Public } from './decorators';
import { AuthLoginDto, AuthRegisterDto } from './dto';
import { Tokens } from './types';
import { RefreshTokenGuard } from './guards';

@Controller('/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() authRegisterDto: AuthRegisterDto) {
    return this.authService.register(authRegisterDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetUsername() username: string) {
    return this.authService.logout(username);
  }

  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@GetUsername() username: string) {
    return this.authService.verify(username);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetUsername() username: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refresh(username, refreshToken);
  }
}
