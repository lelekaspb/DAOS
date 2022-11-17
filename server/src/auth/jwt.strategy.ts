import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

import { UserService } from './../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    console.log('jwt.strategy validate ', payload);
    console.log('jwt.strategy validate, Request Param Id ', req.params.id);

    const canEditOrDelete = req.params.id === payload.sub;
    if (canEditOrDelete) {
      return { userId: payload.sub, email: payload.email };
    }

    throw new ForbiddenException();
  }
}
