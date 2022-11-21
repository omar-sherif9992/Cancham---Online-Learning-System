import { HttpException } from '@/Exceptions/HttpException';
import { verifyRefreshToken } from '@/Token/token.util';
import { CreateUserDto, UserLoginDTO } from '@/User/user.dto';
import { Role } from '@/User/user.enum';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { logger } from '@/Utils/logger';
import AuthService from '@Authentication/auth.dao';
import { type IUser } from '@User/user.interface';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { type RequestWithTokenPayload } from './auth.interface';
class AuthController {
  public authService = new AuthService();

  public signUp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('signUp');
      const userData: CreateUserDto = req.body;
      const signUpUserData: IUser = await this.authService.signup(userData, Role.TRAINEE);

      res.status(HttpStatusCodes.CREATED).json({
        data: signUpUserData,
        message: 'signup',
      });
    } catch (error) {
      next(error);
    }
  });

  // @desc login
  // @route POST /login
  // @access Public
  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('login');
      const userData: UserLoginDTO = req.body;
      const { cookie, findUser, accessToken } = await this.authService.login(userData);
      logger.info('after authService');

      //res.setHeader('Set-Cookie', [cookie]);
      res.cookie(cookie.name, cookie.value, cookie.options);
      res.status(HttpStatusCodes.OK).json({
        data: { accessToken, user: findUser },
        message: 'login',
      });
    } catch (error) {
      next(error);
    }
  };

  // @desc logout
  // @route POST /auth/logout
  // @access Public - just to clear cookie if exists
  public logOut = async (request: RequestWithTokenPayload, response: Response, next: NextFunction) => {
    try {
      const { cookies } = request;
      if (!cookies || !cookies.Authorization) {
        return response.status(HttpStatusCodes.NO_CONTENT);
      }

      const logOutUserData: IUser = await this.authService.logout(request.tokenPayload);
      response.clearCookie('Authorization', {
        httpOnly: true,
        sameSite: 'none',
        secure: false,
      });

      response.status(HttpStatusCodes.OK).json({
        data: logOutUserData,
        message: 'logout',
      });
    } catch (error) {
      next(error);
    }
  };

  // @desc Refresh
  // @route GET /auth/refresh
  // @access Public - because acess token has expired
  public refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cookies } = req;
      if (!cookies || !cookies?.Authorization) throw new HttpException(HttpStatusCodes.UNAUTHORIZED, "There's No Authorization Cookies");

      const refreshToken = cookies.Authorization ?? cookies.authorization;
      const accessToken = verifyRefreshToken(refreshToken);

      res.status(HttpStatusCodes.OK).json({
        data: { accessToken },
        message: 'refreshed refresh token',
      });
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;