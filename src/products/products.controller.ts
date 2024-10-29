import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDTO } from './DTOs/createProductDTO';
import { UpdateProductDTO } from './DTOs/updateProductDTO';

@Controller('products')
export class ProductsController {
    constructor(private productService:ProductsService){}

    // Get all products 
    @Get('all')
    async findAllProducts():Promise<Product[]>{
        return await this.productService.findAllProducts()
    }

    // get product by id 

    @Get(':id')
    async getProductById(@Param('id') id:string):Promise<Product>{
        return await this.productService.findProductByID(id)
    }

    //add new product

    @Post('add')
    @UseInterceptors(FileInterceptor('image'))
    async addProduct(
        @Body() productData: CreateProductDTO,
        @UploadedFile() image: Express.Multer.File
    ) {
        return await this.productService.addProduct(productData, image);
    }

    //update product

    @Post('update/:id')
    async updateProduct(@Param('id') id:string, @Body() product:UpdateProductDTO):Promise<Product>{
     return this.productService.updateProduct(id, product)
    }

    //delete product

    @Delete(':id')
    async deleteProduct(@Param('id') id:string):Promise<string>{
        return this.productService.deleteProduct(id)
    }


}
