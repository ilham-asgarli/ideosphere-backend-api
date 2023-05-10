import { Request, Response } from 'express';
import { User } from '../db/models';
import { generatePasswordHash, verifyPasswordHash } from '../helpers/hash.helper';
import { generateJwtToken, verifyJwtToken } from '../helpers/jwt.helper';
import { handleErrorAsync } from '../middlewares/errors/async_error_handler.middleware';
import { plainToInstance, instanceToPlain } from "class-transformer";
import { BadRequestError, NotFoundError } from "../errors";
import { LoginRequestDTO, RegisterRequestDTO } from '../dtos';
import { SuccessResponse } from '../responses';
import ResetPasswordRequestDTO from '../dtos/reset-password-request.dto';
import { validateDTO } from '../helpers/validation.helper';

class AuthController {
  public login = handleErrorAsync(async (req: Request, res: Response) => {
    const loginRequestDTO = plainToInstance(LoginRequestDTO, req.body);

    validateDTO(loginRequestDTO);

    const user = await User.findOne({ where: { email: loginRequestDTO.email } });

    if (!user) {
      throw new BadRequestError('Invalid email or password.');
    }

    const isPasswordValid = await verifyPasswordHash(loginRequestDTO.password!, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError('Invalid email or password.');
    }

    const token = generateJwtToken({ userId: user.id });

    res.json(instanceToPlain(new SuccessResponse({data : {token: token} })));
  });

  public register = handleErrorAsync(async (req: Request, res: Response) => {
    const registerRequestDTO = plainToInstance(RegisterRequestDTO, req.body);

    validateDTO(registerRequestDTO);

    const hashedPassword = await generatePasswordHash(registerRequestDTO.password!);

    const user = await User.create({ email: registerRequestDTO.email!, password: hashedPassword });

    const token = generateJwtToken({ userId: user.id });
    return res.json(instanceToPlain(new SuccessResponse({data : {token: token} })));
  });

  public resetPassword = handleErrorAsync(async (req: Request, res: Response) => {
    const { password } = req.body;
    const token = (req.headers.authorization ?? '').split(' ')[1];

    const resetPasswordRequestDTO = plainToInstance(ResetPasswordRequestDTO, req.body);

    validateDTO(resetPasswordRequestDTO);

    const decoded = await verifyJwtToken(token) as { userId: string };
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const passwordHash = await generatePasswordHash(password);

    await user.update({ password: passwordHash });
    res.json({ message: 'Password reset successfully.' });
  });
}

export { AuthController };