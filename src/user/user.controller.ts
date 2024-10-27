import { Controller, Post, Body, NotFoundException, UseGuards, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtUserGuard } from './jwtGuard';
import { AdminGuard } from './adminGuard';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(JwtUserGuard)
    @Get('me')
    getProfile(@Request() req) {
      return this.userService.fetchUserById(req.user);
    }


    //protected route --- only amdin can search user with email
    @UseGuards(AdminGuard)
    @Post('find')
    async getUserByEmail(@Body('email') email:string){
     const user = await this.userService.getUserByEmail(email)
     if(!user){
        throw new NotFoundException('User not found')
     }
     return user
    }
}
