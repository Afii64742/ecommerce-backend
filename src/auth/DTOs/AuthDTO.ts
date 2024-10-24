import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class signupDTO{
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @MinLength(8)
    password:string

    @IsNotEmpty()
    isAdmin:boolean
}

export class loginDTO{


    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @MinLength(8)
    password:string

}