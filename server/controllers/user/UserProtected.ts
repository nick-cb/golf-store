import { NextFunction, Request, Response } from "express";
import User from "../../models/userModel";

import {
  TokenValidateBase,
  CookieExtraction,
} from "../auth/AuthenticateBase";
import AuthController from "./UserController";

export class UserProtect extends AuthController {
  async refreshTokens(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const cookieExtraction = new CookieExtraction("refresh_token");

    try {
      const service = new TokenValidateBase(
        cookieExtraction,
        process.env.REFRESH_TOKEN_SECRET!
      );
      // get token from request
      const token = cookieExtraction.extract(req);

      // get userId
      const { userId } = service.validateToken(req, res);
      if(!userId) return
      const user = await User.findById(userId);

      // Compare token from request with current token
      if (!user || user.refreshToken !== token) {
        return super.sendError(401, res, "UnAthorized, invalid refresh token");
      }

      req.user = user;
      return super.refreshTokens(req, res, next);
    } catch (error: any) {
      return super.sendError(500, res);
    }
  }
}