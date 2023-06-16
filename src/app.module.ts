import { Module } from '@nestjs/common';

import { AuthModule } from '@/api/auth/auth.module';
import { PostsModule } from '@/api/posts/posts.module';
import { UsersModule } from '@/api/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, PostsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
