import jwt from 'jsonwebtoken';
import { InvalidTokenError } from '../errors';
import { Request } from 'express';

function generateJwtToken(
  payload: any,
  secretKey: string = process.env.JWT_SECRET!,
  expiresIn: string = '60d',
): string {
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
}

function verifyJwtToken(token: string, secretKey: string = process.env.JWT_SECRET!): any {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new InvalidTokenError();
  }
}

async function verifyJWTAndGetInfo(req: Request, secretKey: string = process.env.JWT_SECRET!): Promise<any> {
  const authorization = req.headers.authorization ?? '';
  const auth = authorization.split(' ');
  const token = auth[auth.length > 0 ? auth.length - 1 : 0];
  const decoded = (await verifyJwtToken(token)) as { userId: string };
  return decoded;
}

export { generateJwtToken, verifyJwtToken, verifyJWTAndGetInfo as getInfoFromRequest };
