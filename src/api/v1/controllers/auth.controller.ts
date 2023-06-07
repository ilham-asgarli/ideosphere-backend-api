import { getInfoFromRequest } from '../helpers/jwt.helper';
import { handleErrorAsync } from '../middlewares/errors/async_error_handler.middleware';
import { SuccessResponse } from '../responses';
import { AuthService } from '../services';
import { AuthValidator } from '../validators';

export class AuthController {
  authValidator = new AuthValidator();
  authService = new AuthService();

  checkEmail = handleErrorAsync(async (req, res) => {
    this.authValidator.checkEmail(req.body);

    const data = await this.authService.checkEmail(req.body);
    res.status(204).end();
  });

  signIn = handleErrorAsync(async (req, res) => {
    this.authValidator.signIn(req.body);

    const data = await this.authService.signIn(req.body);
    res.status(200).json(new SuccessResponse({ data }));
  });

  signUp = handleErrorAsync(async (req, res) => {
    this.authValidator.signUp(req.body);

    const data = await this.authService.signUp(req.body);
    return res.status(201).json(new SuccessResponse({ data }));
  });

  resetPassword = handleErrorAsync(async (req, res) => {
    const decoded = await getInfoFromRequest(req);

    req.body.id = decoded.userId;
    this.authValidator.resetPassword(req.body);

    await this.authService.resetPassword(req.body);

    res.status(204).end();
  });
}
