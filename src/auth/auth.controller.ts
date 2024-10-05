import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login/Register')
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService,private readonly userService:UserService,private readonly authservice:AuthService) {}

  @Post('/login')
  @UseGuards(AuthGuard('local'))
 async create(@Body() createAuthDto: CreateAuthDto ,@Req() req : Request) {
    const user:any = req.user;

    const payload :any = {
      id : user.id,
      username:user.username,
      email:user.email,
      role:user.role
    }
    console.log(payload)
    return this.jwtService.sign(payload);
  }

  @Post('/register')
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    let user = await this.userService.create(createUserDto);
    const payload = {
        id:user.id,
        username:user.username,
        email:user.email,
        role:user.role
    }
    console.log(payload);
  
    let token = this.authservice.generatedToken(payload);
    return token ;
  }


}
