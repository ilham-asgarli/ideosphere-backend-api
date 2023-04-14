import { NextFunction, Request, Response } from 'express';
import { User } from '../db/models';
import { generatePasswordHash, verifyPasswordHash } from '../helpers/hash.helper';
import { generateJwtToken, verifyJwtToken } from '../helpers/jwt.helper';
import { handleErrorAsync } from '../middlewares/errors/async_error_handler.middleware';
import BadRequestError from '../errors/bad_request.error';
import NotFoundError from '../errors/not_found.error';

class AuthController {
  public login = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Email, and password are required.');
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestError('Invalid email or password.');
    }

    const isPasswordValid = await verifyPasswordHash(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError('Invalid email or password.');
    }

    const token = generateJwtToken({ userId: user.id });

    res.json({ token });
  });

  public register = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError('Email, and password are required.');
    }

    const hashedPassword = await generatePasswordHash(password);

    // TODO: user_type_id must come from request
    const user = await User.create({ email, password: hashedPassword, user_type_id: 1 });

    const token = generateJwtToken({ userId: user.id });
    return res.json({ token });
  });

  public resetPassword = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    const token = (req.headers.authorization ?? '').split(' ')[1];

    if (!password || !token) {
      throw new BadRequestError('Password and token are required.');
    }

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