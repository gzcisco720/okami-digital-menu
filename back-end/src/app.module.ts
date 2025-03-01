import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access_token.guard';
// import { RolesGuard } from './auth/guards';
import { MenuModule } from './menu/menu.module';

const NODE_ENV = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.${NODE_ENV}.env`],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL || '', {
      dbName: process.env.MONGODB_DB,
    }),
    UsersModule,
    AuthModule,
    MenuModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
