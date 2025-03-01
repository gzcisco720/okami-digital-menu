export type JwtPayload = {
  username: string;
  email: string;
  iat: number;
  exp: number;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
