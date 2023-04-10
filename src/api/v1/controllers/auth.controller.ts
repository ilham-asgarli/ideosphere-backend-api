import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { User } from '../db/models';

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

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '');

    res.json({ token });
  }

  public static async register(req: Request, res: Response): Promise<void> {
    const id: string = uuid();
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email, and password are required.' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ id, email, password: hashedPassword });
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || '');
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
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: string };
      const user = await User.findByPk(decoded.userId);

      if (!user) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);

      await user.update({ password: passwordHash });
      res.json({ message: 'Password reset successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong.' });
    }
  }
}

export { UserController };