import { Module } from '@nestjs/common';
import { GoogleController } from './Google.controller';
import { GoogleService } from './Google.service';
import { GoogleUser } from './googleUser.schema';
import { GoogleUserSchema } from './googleUser.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
   
    MongooseModule.forFeature([{ name: GoogleUser.name, schema: GoogleUserSchema }])
  ],
  controllers: [GoogleController],
  providers: [GoogleService],
})
export class GoogleModule {}



