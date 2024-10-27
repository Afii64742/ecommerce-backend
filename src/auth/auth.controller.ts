import { Body, Controller, Post, UnauthorizedException,Request, BadRequestException, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO, signupDTO } from './DTOs/AuthDTO';
import { User } from 'src/user/schema/user.schema';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async Signup(@Body() signupDTO: signupDTO): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.authService.signup(signupDTO); 
      return user; 
    } catch (error) {
      throw new BadRequestException(error.message);  
    }
  }

  @Post('login')
  async Login(@Body() loginDTO: loginDTO) {
    try {
      const user = await this.authService.validateUser(loginDTO);
      return this.authService.login(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');  
    }
  }



}
