import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';

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
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
