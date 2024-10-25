import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userService:Model<UserDocument>){}

    async fetchUser(email:string):Promise<Omit<User, 'password'>>{
    const user= await this.userService.findOne({email}).exec();
    if(!user){
        throw new NotFoundException('User not found')
    }
    const {password:_, ...result} = user.toObject()

    return result
    }
}
