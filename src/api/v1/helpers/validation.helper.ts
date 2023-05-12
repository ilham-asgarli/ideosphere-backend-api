import { validate } from "class-validator";
import { ValidationError } from "../errors";

export async function validateDTO(object: Object) {
  const validatonErrors = await validate(object, { stopAtFirstError: true, skipMissingProperties: true });

  if (validatonErrors.length > 0) {
    for (const type in validatonErrors[0].constraints) {
      throw new ValidationError(undefined, { [validatonErrors[0].property]: validatonErrors[0].constraints[type] });
    }
  }
}