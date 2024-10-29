import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),    
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory:async(ConfigService:ConfigService)=>({
        uri:ConfigService.get<string>('MONGO_URI')
      }),
      inject: [ConfigService],
    }),
    
    AuthModule,
    UserModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService, CloudinaryService],
  exports: [CloudinaryService]
})
export class AppModule {}
