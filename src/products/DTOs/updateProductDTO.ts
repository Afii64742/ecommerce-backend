import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateProductDTO{
    title:string

    description:string
    @IsNumber()
    price:number

    category:string

}