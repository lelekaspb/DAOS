import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostService } from './../post/post.service';

@Injectable()
export class OnlySameUserByIdAllowed implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const requestUserId = req.params.id;

    try {
      if (req?.user.userId === requestUserId) {
        return next.handle();
      } else {
        throw new HttpException(
          {
            success: false,
            status: HttpStatus.UNAUTHORIZED,
            message: 'Man kan kun redigere eller slette deres egne data',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.UNAUTHORIZED,
          message: 'Man kan kun redigere eller slette deres egne data',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

@Injectable()
export class OnlyPostCreatorAllowed implements NestInterceptor {
  constructor(protected readonly postService: PostService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const requestPostId = req.params.id;
    const loggedInUserId = req?.user.userId;
    const postCreatorId = await this.postService.getPostCreatorId(
      requestPostId,
    );
    console.log('requestPostId ' + requestPostId);
    console.log('loggedInUserId ' + loggedInUserId);
    console.log('postCreatorId ' + postCreatorId);
    try {
      if (String(loggedInUserId) === String(postCreatorId)) {
        return next.handle();
      } else {
        throw new HttpException(
          {
            success: false,
            status: HttpStatus.UNAUTHORIZED,
            message:
              'Kun den bruger, der har oprettet opslaget, kan slette eller redigere det',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (err) {
      throw new HttpException(
        {
          success: false,
          status: HttpStatus.UNAUTHORIZED,
          message:
            'Kun den bruger, der har oprettet opslaget, kan slette eller redigere det',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
