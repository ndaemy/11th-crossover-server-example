import { Module } from '@nestjs/common';

import { AuthModule } from '@/api/auth/auth.module';
import { UsersModule } from '@/api/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
