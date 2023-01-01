import { HttpException, HttpStatus } from '@nestjs/common';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PostService } from './../post/post.service';
import { OrchestraService } from './../orchestra/orchestra.service';

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

@Injectable()
export class OnlyOrchestraCreatorAllowed implements NestInterceptor {
  constructor(protected readonly orchestraService: OrchestraService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const requestOrchestraId = req.params.id;
    const loggedInUserId = req?.user.userId;
    const orchestraCreatorId =
      await this.orchestraService.getOrchestraCreatorId(requestOrchestraId);
    console.log('requestOrchestraId ' + requestOrchestraId);
    console.log('loggedInUserId ' + loggedInUserId);
    console.log('orchestraCreatorId ' + orchestraCreatorId);

    try {
      if (String(loggedInUserId) === String(orchestraCreatorId)) {
        return next.handle();
      } else {
        throw new HttpException(
          {
            success: false,
            status: HttpStatus.UNAUTHORIZED,
            message:
              'Kun den bruger, der har oprettet ensemblet, kan slette eller redigere det',
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
            'Kun den bruger, der har oprettet ensemblet, kan slette eller redigere det',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}

@Injectable()
export class CanOnlyAddThemselvesAsMember implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const requestUserId = req.body.id || req.params.userId;
    const loggedInUserId = req?.user.userId;
    console.log('requestUserId ' + requestUserId);
    console.log('loggedInUserId ' + loggedInUserId);

    try {
      if (loggedInUserId === requestUserId) {
        return next.handle();
      } else {
        throw new HttpException(
          {
            success: false,
            status: HttpStatus.UNAUTHORIZED,
            message:
              'Man kan kun tilføje eller fjerne sig selv som ensemblemedlem',
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
            'Man kan kun tilføje eller fjerne sig selv som ensemblemedlem',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
