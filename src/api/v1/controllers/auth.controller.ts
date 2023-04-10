import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { User } from '../db/models';
import { generatePasswordHash, verifyPasswordHash } from '../helpers/hash.helper';
import { generateJwtToken, verifyJwtToken } from '../helpers/jwt.helper';

class UserController {
  public static async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    const isPasswordValid = await verifyPasswordHash(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    const token = generateJwtToken({ userId: user.id });

    res.json({ token });
  }

  public static async register(req: Request, res: Response): Promise<void> {
    const id: string = uuid();
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email, and password are required.' });
      return;
    }

    const hashedPassword = generatePasswordHash(password);

    try {
      const user = await User.create({ id, email, password: hashedPassword });
      const token = generateJwtToken({ userId: user.id });
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }

  public static async resetPassword(req: Request, res: Response): Promise<void> {
    const { password } = req.body;
    const token = (req.headers.authorization ?? '').split(' ')[1];
    console.log(token)

    if (!password || !token) {
      res.status(400).json({ message: 'Password and token are required.' });
      return;
    }

    try {
      const decoded = verifyJwtToken(token)  as { userId: string };
      const user = await User.findByPk(decoded.userId);

      if (!user) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }

      const passwordHash = generatePasswordHash(password);

      await user.update({ password: passwordHash });
      res.json({ message: 'Password reset successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }
}

export { UserController };