import jwt from 'jsonwebtoken';

const generateJwtToken = (payload: any, secretKey?: string, expiresIn?: string): string => {
    const token = jwt.sign(payload, secretKey ?? process.env.JWT_SECRET!, { expiresIn });
    return token;
};

const verifyJwtToken = (token: string, secretKey?: string): any => {
    try {
        const decoded = jwt.verify(token, secretKey ?? process.env.JWT_SECRET!);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export { generateJwtToken, verifyJwtToken };
