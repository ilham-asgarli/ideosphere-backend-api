import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const generatePasswordHash = (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

const verifyPasswordHash = async (password: string, hash: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error('Error verifying password hash');
    }
};

export { generatePasswordHash, verifyPasswordHash };