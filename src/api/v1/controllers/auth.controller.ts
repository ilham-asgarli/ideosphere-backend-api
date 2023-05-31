import { getInfoFromRequest } from '../helpers/jwt.helper';
import { handleErrorAsync } from '../middlewares/errors/async_error_handler.middleware';
import { plainToInstance } from "class-transformer";
import { SuccessResponse } from '../responses';
import { validateDTO } from '../helpers/validation.helper';
import { LoginRequestDTO, RegisterRequestDTO, ResetPasswordRequestDTO } from '../dtos/request';
import { AuthService } from '../services';

export class AuthController {
  authService = new AuthService();

  login = handleErrorAsync(async (req, res) => {
    const loginRequestDTO = plainToInstance(LoginRequestDTO, req.body);
    await validateDTO(loginRequestDTO);

    const data = await this.authService.login(loginRequestDTO);
    res.status(200).json(new SuccessResponse({ data }));
  });

  register = handleErrorAsync(async (req, res) => {
    const registerRequestDTO = plainToInstance(RegisterRequestDTO, req.body);
    await validateDTO(registerRequestDTO);

    const data = await this.authService.register(registerRequestDTO);
    return res.status(201).json(new SuccessResponse({ data }));
  });

  resetPassword = handleErrorAsync(async (req, res) => {
    const decoded = await getInfoFromRequest(req);

    const resetPasswordRequestDTO = plainToInstance(ResetPasswordRequestDTO, req.body);
    resetPasswordRequestDTO.id = decoded.userId;

    await validateDTO(resetPasswordRequestDTO);

    await this.authService.resetPassword(resetPasswordRequestDTO);

    res.status(204).end();
  });
}