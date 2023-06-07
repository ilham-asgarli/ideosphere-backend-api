import Joi from "joi";
import { validate } from "../helpers/validation.helper";

export class AuthValidator {
    checkEmail(body: any) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
        });

        validate(body, schema);
    }

    signIn(body: any) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required(),
        });

        validate(body, schema);
    }

    signUp(body: any) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required(),
            phone_number: Joi.string(),
            customer: Joi.object().keys({
                gender_id: Joi.number().required(),
                firstname: Joi.string(),
                lastname: Joi.string(),
                biography: Joi.string().min(0).max(300),
            }).allow(null),
            company: Joi.object().keys({
                name: Joi.string(),
                description: Joi.string().min(0).max(1000),
            }).allow(null).when('customer', {
                is: Joi.exist(),
                then: Joi.valid(null),
                otherwise: Joi.required()
            }),
        });

        validate(body, schema);
    }

    resetPassword(body: any) {
        const schema = Joi.object({
            id: Joi.string().uuid().required(),
            oldPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required(),
            newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(6).required(),
        });

        validate(body, schema);
    }
}