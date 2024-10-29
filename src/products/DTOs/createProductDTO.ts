import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    category: string;
}