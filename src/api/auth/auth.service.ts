import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '@/api/users/users.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async register(registerDto: RegisterDto) {
    return this.usersService.create({
      ...registerDto,
      password: await this.hashPassword(registerDto.password),
    });
  }

  async login(loginDto: LoginDto) {
    let user;
    try {
      user = await this.usersService.findOne(loginDto.id);
    } catch (e) {
      throw new UnauthorizedException([
        '해당 아이디를 가진 유저가 존재하지 않습니다.',
      ]);
    }

    if (!(await this.comparePassword(loginDto.password, user.password))) {
      throw new UnauthorizedException(['비밀번호가 일치하지 않습니다.']);
    }

    const payload = {
      userId: user.id,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
