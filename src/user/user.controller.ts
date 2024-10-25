<<<<<<< HEAD
import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
=======
import { Body, Controller, Post } from '@nestjs/common';
>>>>>>> 5668f1366faf7266136908682329df5f6b258672
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

<<<<<<< HEAD
    @Post('find')
    async getUserByEmail(@Body('email') email:string){
     const user = await this.userService.getUserByEmail(email)
     if(!user){
        throw new NotFoundException('User not found')
     }
     return user
=======
    @Post('me')
    async getUser(@Body('email') email:string){
    return await this.userService.fetchUser(email)
>>>>>>> 5668f1366faf7266136908682329df5f6b258672
    }
}
