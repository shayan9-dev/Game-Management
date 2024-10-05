import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private readonly jwtservice: JwtService) {
    }

    generatedToken(payload: any) {
        return this.jwtservice.sign(payload)
    }
}
