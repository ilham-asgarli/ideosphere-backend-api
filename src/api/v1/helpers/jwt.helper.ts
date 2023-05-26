import jwt from 'jsonwebtoken';
import { InvalidTokenError } from '../errors';
import { Request } from 'express';

const generateJwtToken = (payload: any, secretKey: string = process.env.JWT_SECRET!, expiresIn: string = '60d'): string => {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
};

const verifyJwtToken = (token: string, secretKey: string = process.env.JWT_SECRET!): any => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw new InvalidTokenError();
    }
};

const getInfoFromRequest = async (req: Request, secretKey: string = process.env.JWT_SECRET!): Promise<any> => {
    const token = (req.headers.authorization ?? '').split(' ')[1];
    const decoded = await verifyJwtToken(token) as { userId: string };
    return decoded;
};

export { generateJwtToken, verifyJwtToken, getInfoFromRequest };
