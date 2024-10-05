import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";
import * as  bcrypt from 'bcrypt'
import { ReturnDocument } from "typeorm";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private readonly userservice:UserService){
        super({
            usernameField :'email'
        })
    }

 async validate( email:string, password:string ){

    let user:User = await this.userservice.findbyemail(email);

    if(!user){
        throw new UnauthorizedException('User Not Found')
    }

    const IsValidPassword =  bcrypt.compare(password,user.password);

    if(!IsValidPassword){
       throw new UnauthorizedException('password or email is incorrect')
    }
    else{
        return user;
    }

    }

}