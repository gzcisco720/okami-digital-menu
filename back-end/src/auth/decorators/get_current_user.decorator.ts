import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRefreshToken } from '../types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRefreshToken, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
