import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type RefreshTokenDcoument = RefreshToken & Document

export class RefreshToken{
    @Prop({isRequired:true, unique:true})
    userId:string

    @Prop({isRequired:true, unique:true})
    token:string

    @Prop({default:Date.now()})
    createdAt:Date;

    @Prop({default:Date.now(), expires:'7d'})
    expiresAt:Date;
}

export const refreshTokenSchema = SchemaFactory.createForClass(RefreshToken)