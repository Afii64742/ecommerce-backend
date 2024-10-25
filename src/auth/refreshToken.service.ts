import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RefreshTokenDcoument } from "./schema/refreshToken.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RefreshToken{
    constructor(@InjectModel(RefreshToken.name) private refreshTokenModel:Model<RefreshTokenDcoument>,
      private jwtService:JwtService
){}

// CREATING REFRESH TOKEN 
    async createRefresToken(userId:string):Promise<string>{
      const refreshToken = await this.jwtService.sign({userId:userId})
      return refreshToken
    }

    // VERIFYING TOKEN 

    async verifyToken(token:string):Promise<any>{
        try{
         await this.jwtService.verify(token)
        }catch(error){
            throw new UnauthorizedException('Invalid Refresh Token');
        }
   
    }

    //Deleting Refresh Token

    async deleteRefreshToken(token:string):Promise<any>{
     try{
        await this.refreshTokenModel.deleteOne({token})
     }catch(error){
        throw new Error(error)
     }
    }

    //Find Refresh Token

    async findRefreshToken(token:string):Promise<any>{
     try{
        return await this.refreshTokenModel.findOne({token}).exec()
     }catch(error){
        throw new NotFoundException('Token not found')
     }
    }
}