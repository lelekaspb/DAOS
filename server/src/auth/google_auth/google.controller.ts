import { Body, Controller, Get, Post } from '@nestjs/common';
import { GoogleService } from './Google.service';
 import { OAuth2Client } from 'google-auth-library';


 const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

@Controller()
export class GoogleController {
  constructor(private googleService: GoogleService) {
    
  }
  @Get('/')
  getHello(): string {
    return this.googleService.getHello();
  }

  
  @Post('/googlelogin')
  async login(@Body('token') token): Promise<any> {

    const ticket = await client.verifyIdToken({
      idToken : token,
      audience : process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload();
    
    console.log(ticket.getPayload());

    const data = await this.googleService.login({
      email: payload.email,
      firstName: payload.name,
      image: payload.picture
    })

    return data;
  }

 
  
}