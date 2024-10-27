import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { RefreshToken } from './refreshToken.service';
import { MongooseModule } from '@nestjs/mongoose';
import { refreshTokenSchema } from './schema/refreshToken.schema';


@Module({
  imports:[
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:async(ConfigService:ConfigService)=>({
        secret:ConfigService.get<string>('JWT_SECRET'),
        signOptions:{expiresIn:'7d'}
      })
    }),
    MongooseModule.forFeature([{name:RefreshToken.name, schema:refreshTokenSchema}]),
    PassportModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshToken]
})
export class AuthModule {}
