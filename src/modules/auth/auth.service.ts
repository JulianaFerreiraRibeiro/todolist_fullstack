import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService){}
  async login(email: string, password: string) {
    
    const user = await this.userService.findUserByEmail(email)

    if(!user){
      throw new UnauthorizedException('Invalid email or password.')
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new UnauthorizedException('Invalid email or password.')
    }

    return {
        token: this.jwtService.sign({email: email}, {subject: user.id})
    }
  }


}
