import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserModule } from './../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { OnlyPostCreatorAllowed } from './user.interceptor';
import { PostService } from 'src/post/post.service';
import { PostModule } from 'src/post/post.module';
import { OrchestraModule } from 'src/orchestra/orchestra.module';

@Module({
  imports: [
    UserModule,
    PostModule,
    OrchestraModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60 * 60 * 24 },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
