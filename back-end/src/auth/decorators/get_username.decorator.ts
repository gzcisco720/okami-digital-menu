import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUsername = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return user.username;
  },
);
