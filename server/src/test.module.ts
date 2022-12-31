import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrchestraModule } from './orchestra/orchestra.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/test'),
    UserModule,
    OrchestraModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, OrchestraModule, AuthModule],
})
export class TestModule {}
