import { inject, injectable } from "tsyringe";
import { JwtPayload } from "../../interfaces/jwt-payload";
import { Tokens } from "../../interfaces/tokens-interface";
import jwt from "jsonwebtoken";

@injectable()
export class JwtService {
  constructor(
    @inject("SECRET_KEY") private secretKey: string,
    @inject("access-token-expireTime") private accessTokenExpireTime: number,
    @inject("refresh-token-expireTime") private refreshTokenExpireTime: number
  ) {}

  signTokens(jwtPayload: JwtPayload): Tokens {
    const accessToken = jwt.sign(jwtPayload, this.secretKey, {
      expiresIn: this.accessTokenExpireTime,
    });

    const refreshToken = jwt.sign(jwtPayload, this.secretKey, {
      expiresIn: this.refreshTokenExpireTime,
    });

    return { accessToken, refreshToken };
  }
}
