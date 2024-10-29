import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports:[MongooseModule.forFeature([{name:Product.name, schema:ProductSchema}])],
  providers: [ProductsService, CloudinaryService],
  controllers: [ProductsController]
})
export class ProductsModule {}
