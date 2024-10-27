import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}])
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports:[MongooseModule],
})
export class UserModule {}
