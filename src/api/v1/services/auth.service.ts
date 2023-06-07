import { Company, Customer, User } from '../models';
import { generatePasswordHash, verifyPasswordHash } from '../helpers/hash.helper';
import { generateJwtToken } from '../helpers/jwt.helper';
import { BadRequestError, NotFoundError } from "../errors";
import { convertModeltoDTOJSON } from '../helpers/dto_model_convert.helper';
import { CompanyDTO, CustomerDTO, UserDTO } from '../dtos/model';
import { LoginResponseDTO, RegisterResponseDTO } from '../dtos/response';

export class AuthService {
    async checkEmail(body: any) {
        const user = await User.findOne({ where: { email: body.email } });

        if (!user)
            throw new NotFoundError("User with this email not exists.");
    }

    async signIn(body: any): Promise<LoginResponseDTO> {
        const user = await User.findOne({ where: { email: body.email } });

        if (!user)
            throw new BadRequestError('Invalid email or password.');

        const isPasswordValid = await verifyPasswordHash(body.password!, user.password);

        if (!isPasswordValid)
            throw new BadRequestError('Invalid email or password.');

        const token = generateJwtToken({ userId: user.id });

        const loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.token = token;
        loginResponseDTO.user = convertModeltoDTOJSON(UserDTO, user);

        return loginResponseDTO;
    }

    async signUp(body: any): Promise<RegisterResponseDTO> {
        const registerResponseDTO = new RegisterResponseDTO();

        const hashedPassword = await generatePasswordHash(body.password!);

        body.password = hashedPassword;

        const user_type_id = body.company == null ? 1 : 2;
        const user = await User.create({
            email: body.email,
            password: body.password,
            phone_number: body.phone_number,
            user_type_id,
        });

        if(user_type_id == 1) {
            const customer = await Customer.create({
                user_id: user.id,
                firstname: body.customer.firstname,
                lastname: body.customer.lastname,
                biography: body.customer.biography,
                gender_id: body.customer.gender_id,
            });

            registerResponseDTO.customer = convertModeltoDTOJSON(CustomerDTO, customer);
        } else if(user_type_id == 2){
            const company = await Company.create({
                user_id: user.id,
                name: body.company.name,
                description: body.company.description,
            });

            registerResponseDTO.company = convertModeltoDTOJSON(CompanyDTO, company);
        }

        const token = generateJwtToken({ userId: user.id });

        registerResponseDTO.token = token;
        registerResponseDTO.user = convertModeltoDTOJSON(UserDTO, user);

        return registerResponseDTO;
    }

    async resetPassword(body: any): Promise<void> {
        const user = await User.findByPk(body.id);

        if (!user)
            throw new NotFoundError('User not found.');

        const isPasswordValid = await verifyPasswordHash(body.oldPassword!, user.password);

        if (!isPasswordValid)
            throw new BadRequestError('Current password is wrong.');

        if (body.oldPassword! === body.newPassword!)
            throw new BadRequestError("New password can't be the same as old password");

        const passwordHash = await generatePasswordHash(body.newPassword!);

        await user.update({ password: passwordHash });
    }
}