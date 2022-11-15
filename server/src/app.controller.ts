import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @Render('index')
  root() {
    console.log('app controller');
    return { message: 'Hello World' };
    //return { nameOfProperyWithArray: [{title: "fdajklæf"}, ...] };
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
