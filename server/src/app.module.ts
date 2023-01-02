import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { OrchestraModule } from './orchestra/orchestra.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { GoogleModule} from './auth/google_auth/google.module'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.connection_string,
      }),
    }),
    OrchestraModule,
    UserModule,
    AuthModule,
    PostModule,
    GoogleModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
