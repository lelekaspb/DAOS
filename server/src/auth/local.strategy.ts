import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.UNAUTHORIZED,
          message:
            'Kunne ikke finde bruger med disse legitimationsoplysninger. Tjek om e-mail og adgangskode er korrekte.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
