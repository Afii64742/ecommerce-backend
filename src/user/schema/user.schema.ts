import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type UserDocument = User & Document;


@Schema()
export class User{
    @Prop({required:true})
    name:string

    @Prop({isRequired:true, unique:true})
    email:string

    @Prop({isRequired:true})
    password:string

    @Prop({default:false})
    isAdmin:boolean;
}

export const UserSchema = SchemaFactory.createForClass(User)