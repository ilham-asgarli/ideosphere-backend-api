import { Request, Response } from 'express';
import { verifyJwtToken } from '../helpers/jwt.helper';
import { handleErrorAsync } from '../middlewares/errors/async_error_handler.middleware';
import { plainToInstance } from "class-transformer";
import { SuccessResponse } from '../responses';
import { validateDTO } from '../helpers/validation.helper';
import { AuthService } from '../services/auth.service';
import { LoginRequestDTO, RegisterRequestDTO, ResetPasswordRequestDTO } from '../dtos/request';

export class AuthController {
  authService = new AuthService();

   login = handleErrorAsync(async (req: Request, res: Response) => {
    const loginRequestDTO = plainToInstance(LoginRequestDTO, req.body);
    await validateDTO(loginRequestDTO);

    const data = await this.authService.login(loginRequestDTO);
    res.status(200).json(new SuccessResponse({ data }));
  });

  public register = handleErrorAsync(async (req: Request, res: Response) => {
    const registerRequestDTO = plainToInstance(RegisterRequestDTO, req.body);
    await validateDTO(registerRequestDTO);

    const data = await this.authService.register(registerRequestDTO);
    return res.status(201).json(new SuccessResponse({ data }));
  });

  public resetPassword = handleErrorAsync(async (req: Request, res: Response) => {
    const token = (req.headers.authorization ?? '').split(' ')[1];
    const decoded = await verifyJwtToken(token) as { userId: string };

    const resetPasswordRequestDTO = plainToInstance(ResetPasswordRequestDTO, req.body);
    resetPasswordRequestDTO.id = decoded.userId;

    await validateDTO(resetPasswordRequestDTO);

    await this.authService.resetPassword(resetPasswordRequestDTO);
    
    res.status(204).end();
  });
}