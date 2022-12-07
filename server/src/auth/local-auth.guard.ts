import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const email = req.body.email;
    const password = req.body.password;
    if (!email.length || !password.length) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.BAD_REQUEST,
          message: 'Angiv venligst e-mail og adgangskode',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return req;
  }
}
