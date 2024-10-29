import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDTO } from './DTOs/createProductDTO';
import {UpdateProductDTO} from "./DTOs/updateProductDTO"
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel:Model<ProductDocument>,
    private cloudinaryService:CloudinaryService
) {}

    // Find all products 
    async findAllProducts():Promise<Product[]>{
    return await this.productModel.find().exec()
    }

    // Find product by ID 
    async findProductByID(id:string):Promise<Product>{
        const product = await this.productModel.findById(id).exec();
       if(!product){
        throw new NotFoundException('Product not found')
       }
        return product;
    }

    async addProduct(productData: CreateProductDTO, image: Express.Multer.File): Promise<Product> {
        let imageURL: string;
        try {
            imageURL = await this.cloudinaryService.uploadImage(image);
            console.log("Image URL from Cloudinary:", imageURL);
        } catch (error) {
            throw new Error('Failed to upload image to Cloudinary');
        }
    
        // Combine productData and imageURL into one object
        const newProductData = {
            ...productData,
            price: Number(productData.price), // Ensure price is stored as a number
            imageURL,
        };
    
        console.log("Combined product data to save:", newProductData);
    
        // Create a new instance of the model with the combined data
        const newProduct = new this.productModel(newProductData);
    
        // Save the new product to the database
        const productSaved = await newProduct.save();
    
        console.log("Saved Product:", productSaved);
        return productSaved;
    }

    //update product

    async updateProduct(id:string, product:UpdateProductDTO):Promise<Product>{
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, product, {new:true})
        if(!updatedProduct){
            throw new NotFoundException(`Product not found`)
        }
        return updatedProduct
    }

    // delete Product 

    async deleteProduct(id:string):Promise<string>{
    const productDeleted =  await this.productModel.findByIdAndDelete(id)
    if(!productDeleted){
       throw new NotFoundException(`Product not found with this ID`)
    }
     return `Product deleted successfully with ID ${id}`

}
}
