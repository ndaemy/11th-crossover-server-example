import { Injectable, NotFoundException } from '@nestjs/common';
import { customAlphabet } from 'nanoid';

import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  posts: Post[] = [];
  nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6);

  create(createPostDto: CreatePostDto, authorId: string) {
    const post = {
      ...createPostDto,
      id: this.nanoid(),
      authorId,
    };

    this.posts.push(post);

    return post;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: string) {
    const post = this.posts.find(post => post.id === id);

    if (!post) {
      throw new NotFoundException('해당 아이디를 가진 포스트가 없습니다.');
    }

    return post;
  }

  remove(id: string) {
    this.findOne(id);

    this.posts = this.posts.filter(post => post.id !== id);
  }
}
