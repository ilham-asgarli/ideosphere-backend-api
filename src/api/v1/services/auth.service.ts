import { User } from '../models';
import { generatePasswordHash, verifyPasswordHash } from '../helpers/hash.helper';
import { generateJwtToken } from '../helpers/jwt.helper';
import { BadRequestError, NotFoundError } from "../errors";
import { convertModeltoDTOJSON, convertDTOtoModelJSON } from '../helpers/dto_model_convert.helper';
import { UserDTO } from '../dtos/model';
import { LoginRequestDTO, RegisterRequestDTO, ResetPasswordRequestDTO } from '../dtos/request';
import { LoginResponseDTO, RegisterResponseDTO } from '../dtos/response';

export class AuthService {
    async login(loginRequestDTO: LoginRequestDTO): Promise<LoginResponseDTO> {
        const user = await User.findOne({ where: { email: loginRequestDTO.email } });

        if (!user)
        throw new BadRequestError('Invalid email or password.');

        const isPasswordValid = await verifyPasswordHash(loginRequestDTO.password!, user.password);

        if (!isPasswordValid)
        throw new BadRequestError('Invalid email or password.');

        const token = generateJwtToken({ userId: user.id });

        const loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.token = token;
        loginResponseDTO.user = convertModeltoDTOJSON(UserDTO, user);

        return loginResponseDTO;
    }

    async register(registerRequestDTO: RegisterRequestDTO): Promise<RegisterResponseDTO> {
        const hashedPassword = await generatePasswordHash(registerRequestDTO.password!);

        registerRequestDTO.password = hashedPassword;
        const user = await User.create(convertDTOtoModelJSON(User, registerRequestDTO));

        const token = generateJwtToken({ userId: user.id });

        const registerResponseDTO = new RegisterResponseDTO();
        registerResponseDTO.token = token;

        return registerResponseDTO;
    }

    async resetPassword(resetPasswordRequestDTO: ResetPasswordRequestDTO): Promise<void> {
        const user = await User.findByPk(resetPasswordRequestDTO.id);

        if (!user)
        throw new NotFoundError('User not found.');

        const isPasswordValid = await verifyPasswordHash(resetPasswordRequestDTO.oldPassword!, user.password);

        if (!isPasswordValid)
        throw new BadRequestError('Current password is wrong.');

        if (resetPasswordRequestDTO.oldPassword! === resetPasswordRequestDTO.newPassword!)
        throw new BadRequestError("New password can't be the same as old password");

        const passwordHash = await generatePasswordHash(resetPasswordRequestDTO.newPassword!);

        await user.update({ password: passwordHash });
    }
}