import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '@/api/users/users.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  login(loginDto: LoginDto) {
    const user = this.usersService.findOne(loginDto.id);

    if (user.password !== loginDto.password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return {
      id: user.id,
    };
  }
}
