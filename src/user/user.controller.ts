import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('me')
    async getUser(@Body('email') email:string){
    return await this.userService.fetchUser(email)
    }
}
