import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { OrchestraModule } from './orchestra/orchestra.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/user-test'),
    UserModule, OrchestraModule
  ],
  controllers: [AppController],
  providers: [UserModule, AppService],
})
export class TestModule {}
