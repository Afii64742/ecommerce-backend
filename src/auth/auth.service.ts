import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { loginDTO, signupDTO } from './DTOs/AuthDTO';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './refreshToken.service';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private refreshTokenService:RefreshToken
  ) {}


  async signup(signupDTO: signupDTO): Promise<Omit<User, 'password'>> {
    console.log("signupdto->",signupDTO)
    const { name, email, password } = signupDTO;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new this.userModel({
      name,
      email,
      password: hashpassword,
    });

    const savedUser= await newUser.save();
    const userObject = savedUser.toObject();
    const { password: _, ...result } = userObject;
    return result
  }


  async validateUser(loginDTO: loginDTO): Promise<User> {
    const { email, password } = loginDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('Invalid credentials.');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials.');
    }

    return user;
  }

  // Login user
  async login(user: any): Promise<{ accessToken: string }> {
    const payload = { userId: user._id, isAdmin:user.isAdmin }; 
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }



}
