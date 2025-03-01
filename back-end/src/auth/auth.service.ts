import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthRegisterDto, AuthLoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(authRegisterDto: AuthRegisterDto) {
    const user = await this.usersService.createUser(authRegisterDto);
    const tokens = await this.getTokens(user.username, user.email);
    await this.updateHashedRefreshToken(user.username, tokens.refresh_token);
    return tokens;
  }

  async login(authDto: AuthLoginDto) {
    const user = await this.usersService.findUserByEmail(authDto.email);
    if (!user) throw new ForbiddenException('Access denied');
    const {
      userAuth: { username, password },
    } = user;

    const isPasswordValid = await bcrypt.compare(authDto.password, password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
    const tokens = await this.getTokens(username, user.email);
    await this.updateHashedRefreshToken(username, tokens.refresh_token);
    return tokens;
  }

  async logout(username: string): Promise<boolean> {
    await this.usersService.updateHashedRefreshToken(username, null);
    return true;
  }

  async refresh(username: string, refreshToken: string) {
    const user = await this.usersService.findUserByUsername(
      username,
      true,
      true,
    );
    if (!user) throw new ForbiddenException('Access denied');
    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.hashedRefreshToken,
    );
    if (!isRefreshTokenValid)
      throw new UnauthorizedException('Invalid credentials');
    const tokens = await this.getTokens(user.username, user.userDetails.email);
    await this.updateHashedRefreshToken(user.username, tokens.refresh_token);
    return tokens;
  }

  async getTokens(username: string, email: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          username,
          email,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          username,
          email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }

  async validateUser(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.findUserByUsername(username, true);
    if (user && user.password === hashedPassword) {
      return user;
    }
    return null;
  }

  async updateHashedRefreshToken(
    username: string,
    refresh_token: string | null,
  ) {
    if (!refresh_token)
      return this.usersService.updateHashedRefreshToken(username, null);
    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    return this.usersService.updateHashedRefreshToken(
      username,
      hashedRefreshToken,
    );
  }

  async verify(username: string) {
    const user = this.usersService.findUserByUsername(username, false);
    if (!user) throw new ForbiddenException('Access denied');
    return user;
  }
}
