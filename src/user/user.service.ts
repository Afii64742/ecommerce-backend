import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
constructor(@InjectModel(User.name) private userService:Model<UserDocument>){}

// get loggedIn user detail 
async fetchUserById(user:any):Promise<any>{
    const _id = user.userId;
   try{
    const user = await this.userService.findOne({_id})
    const {password:_, ...result} = user.toObject()
    return result
   }catch(error){
    throw new Error('User not found')
   }
    }

//protected route, Only admin can search users with email
async getUserByEmail(email:string):Promise<Omit<User, 'password'>>{
const user = await this.userService.findOne({email})
const {password:_, ...result} = user.toObject();
return result
}
}
