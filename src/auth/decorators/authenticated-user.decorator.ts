import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): any => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
