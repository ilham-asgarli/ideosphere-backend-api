import { User } from '../db/models';
import { generatePasswordHash, verifyPasswordHash } from '../helpers/hash.helper';
import { generateJwtToken } from '../helpers/jwt.helper';
import { BadRequestError, NotFoundError } from "../errors";
import { LoginRequestDTO, RegisterRequestDTO, ResetPasswordRequestDTO, UserDTO } from '../dtos';
import { toDTOJSON, toModelJSON } from '../helpers/dto_model_convert.helper';

export class AuthService {
    async login(loginRequestDTO: LoginRequestDTO): Promise<any> {
        const user = await User.findOne({ where: { email: loginRequestDTO.email } });

        if (!user) {
            throw new BadRequestError('Invalid email or password.');
        }

        const isPasswordValid = await verifyPasswordHash(loginRequestDTO.password!, user.password);

        if (!isPasswordValid) {
            throw new BadRequestError('Invalid email or password.');
        }

        const token = generateJwtToken({ userId: user.id });

        return { token: token, user: toDTOJSON(UserDTO, user) };
    }

    async register(registerRequestDTO: RegisterRequestDTO): Promise<any> {
        const hashedPassword = await generatePasswordHash(registerRequestDTO.password!);

        registerRequestDTO.password = hashedPassword;
        const user = await User.create(toModelJSON(User, registerRequestDTO));

        const token = generateJwtToken({ userId: user.id });

        return { token: token };
    }

    async resetPassword(resetPasswordRequestDTO: ResetPasswordRequestDTO): Promise<void> {
        const user = await User.findByPk(resetPasswordRequestDTO.id);

        if (!user) {
            throw new NotFoundError('User not found.');
        }

        const passwordHash = await generatePasswordHash(resetPasswordRequestDTO.password!);

        await user.update({ password: passwordHash });
    }
}