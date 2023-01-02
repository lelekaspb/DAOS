import { Injectable } from '@nestjs/common';
import { GoogleDto } from './google.dto';
import { GoogleUser } from './googleUser.schema';
import { GoogleUserDocument } from './googleUser.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GoogleUserSchema } from './googleUser.schema';

@Injectable()
export class GoogleService {
    constructor(@InjectModel(GoogleUser.name) private userModel: Model<GoogleUserDocument>) {}
    
  getHello(): string {
    return 'Hello World! from DAOS google';
  }

  async login({email, firstName, image  }: {email: string; firstName: string; image: string;})
  : Promise<any>{

    const userExists = await this.userModel.findOne({
      email: email
    })

    if (!userExists){
      const createdUser = new this.userModel({
        email, firstName, image,
      });

      await createdUser.save();
      return createdUser;
    }
    else {

      return userExists;

    }

  }


  
}
