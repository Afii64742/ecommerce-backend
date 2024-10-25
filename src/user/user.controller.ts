import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('find')
    async getUserByEmail(@Body('email') email:string){
     const user = await this.userService.getUserByEmail(email)
     if(!user){
        throw new NotFoundException('User not found')
     }
     return user
    }
}
