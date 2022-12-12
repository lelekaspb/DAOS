import { Controller, Get, UseGuards, HttpStatus, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { AuthService } from "./auth.service";


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

//   @Get()
//   getHello(): string {
//     return this.authService.getHello();
//   }

  @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    //console.log("req", req);
    console.log("user", req.user);

    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}