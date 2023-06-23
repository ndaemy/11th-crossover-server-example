import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';

import { AuthGuard } from '@/api/auth/auth.guard';

import { CreatePostDto, GetPostQuery } from './dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postsService.create(createPostDto, req.userId);
  }

  @UseGuards(AuthGuard)
  @Get()
  findMany(@Query() query: GetPostQuery, @Req() req) {
    const { page = 1, size = 10 } = query;
    return this.postsService.findMany(
      {
        page,
        size,
      },
      req.userId,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
