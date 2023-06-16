import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@/api/users/users.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  async login(loginDto: LoginDto) {
    let user;

    try {
      user = this.usersService.findOne(loginDto.id);
    } catch {
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    if (user.password !== loginDto.password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload = {
      userId: user.id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
