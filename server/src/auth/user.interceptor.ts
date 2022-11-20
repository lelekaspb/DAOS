import { UnauthorizedException } from '@nestjs/common';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OnlySameUserByIdAllowed implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const requestUserId = req.params.id;
    console.log('requestedUserId ' + requestUserId);
    console.log('request.user');
    console.log(req.user);
    try {
      if (req?.user.userId === requestUserId) {
        return next.handle();
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
