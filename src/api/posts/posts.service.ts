import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto, authorId: string) {
    let post;
    try {
      post = await this.prismaService.post.create({
        data: {
          ...createPostDto,
          authorId,
        },
      });
    } catch (e) {
      console.error(e);
      if (e.code === 'P2003') {
        throw new UnauthorizedException(
          '글을 쓰려는 유저가 존재하지 않습니다.',
        );
      }
      throw e;
    }

    return post;
  }

  findAll() {
    return this.prismaService.post.findMany();
  }

  async findOne(id: string) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException('해당 아이디를 가진 포스트가 없습니다.');
    }

    return post;
  }

  async remove(id: string) {
    try {
      await this.prismaService.post.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      console.error(e.code);
    }
  }
}
