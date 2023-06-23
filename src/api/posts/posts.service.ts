import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { CreatePostDto } from './dto';

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

    delete post.authorId;
    return post;
  }

  async findMany(
    {
      page,
      size,
    }: {
      page: number;
      size: number;
    },
    userId: string,
  ) {
    const posts = await this.prismaService.post.findMany({
      skip: (page - 1) * size,
      take: size,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      isMine: post.authorId === userId,
    }));
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.post.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(['해당 아이디를 가진 포스트가 없습니다.']);
      }
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.post.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException(['해당 아이디를 가진 포스트가 없습니다.']);
      }
    }
  }
}
