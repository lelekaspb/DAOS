import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrchestraModule } from './orchestra/orchestra.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/test'),
    UserModule,
    OrchestraModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, OrchestraModule, AuthModule],
})
export class TestModule {}
