import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const conflictErrors: string[] = [];

    const idExist = await this.prismaService.user.findUnique({
      where: {
        id: createUserDto.id,
      },
    });
    if (idExist) {
      conflictErrors.push('이미 해당 아이디를 사용하는 유저가 존재합니다.');
    }

    const emailExist = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
    if (emailExist) {
      conflictErrors.push('이미 해당 이메일을 사용하는 유저가 존재합니다.');
    }

    if (conflictErrors.length > 0) {
      throw new ConflictException(conflictErrors);
    }

    const user = await this.prismaService.user.create({
      data: createUserDto,
    });
    delete user.password;

    return user;
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.user.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException([
          '해당 아이디를 가진 유저가 존재하지 않습니다.',
        ]);
      }
    }
  }
}
