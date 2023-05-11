import jwt from 'jsonwebtoken';
import { InvalidTokenError } from '../errors';

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

export { generateJwtToken, verifyJwtToken };
