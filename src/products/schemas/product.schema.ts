import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type ProductDocument = Product & Document


@Schema()
export class Product{
    @Prop({required:true})
    title:string

    @Prop({required:true})
    description:string

    @Prop({required:true})
    price:number

    @Prop({required:true})
    category:string

    @Prop({required:true})
    imageURL:string
}

export const ProductSchema = SchemaFactory.createForClass(Product)