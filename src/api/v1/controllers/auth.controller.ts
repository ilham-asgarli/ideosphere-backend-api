import { Request, Response } from 'express';
import { User } from '../db/models';
import { generatePasswordHash, verifyPasswordHash } from '../helpers/hash.helper';
import { generateJwtToken, verifyJwtToken } from '../helpers/jwt.helper';
import { handleErrorAsync } from '../middlewares/errors/async_error_handler.middleware';
import { plainToInstance, instanceToPlain } from "class-transformer";
import { BadRequestError, NotFoundError } from "../errors";
import { LoginRequestDTO, RegisterRequestDTO, ResetPasswordRequestDTO, UserDTO } from '../dtos';
import { SuccessResponse } from '../responses';
import { validateDTO } from '../helpers/validation.helper';
import { toDTOJSON, toModelJSON } from '../helpers/dto_model_convert.helper';

class AuthController {
  public login = handleErrorAsync(async (req: Request, res: Response) => {
    const loginRequestDTO = plainToInstance(LoginRequestDTO, req.body);

    await validateDTO(loginRequestDTO);

    const user = await User.findOne({ where: { email: loginRequestDTO.email } });

    if (!user) {
      throw new BadRequestError('Invalid email or password.');
    }

    const isPasswordValid = await verifyPasswordHash(loginRequestDTO.password!, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError('Invalid email or password.');
    }

    const token = generateJwtToken({ userId: user.id });

    res.json(instanceToPlain(new SuccessResponse({ data: { token: token, user: toDTOJSON(UserDTO, user) } })));
  });

  public register = handleErrorAsync(async (req: Request, res: Response) => {
    const registerRequestDTO = plainToInstance(RegisterRequestDTO, req.body);

    await validateDTO(registerRequestDTO);

    const hashedPassword = await generatePasswordHash(registerRequestDTO.password!);

    registerRequestDTO.password = hashedPassword;
    /*const registerUser = plainToInstance(User, instanceToPlain(registerRequestDTO));*/
    const user = await User.create(toModelJSON(User, registerRequestDTO));

    const token = generateJwtToken({ userId: user.id });
    return res.status(201).json(instanceToPlain(new SuccessResponse({ data: { token: token } })));
  });

  public resetPassword = handleErrorAsync(async (req: Request, res: Response) => {
    const { password } = req.body;
    const token = (req.headers.authorization ?? '').split(' ')[1];

    const resetPasswordRequestDTO = plainToInstance(ResetPasswordRequestDTO, req.body);

    await validateDTO(resetPasswordRequestDTO);

    const decoded = await verifyJwtToken(token) as { userId: string };
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const passwordHash = await generatePasswordHash(password);

    await user.update({ password: passwordHash });
    res.status(204).end();
  });
}

export { AuthController };