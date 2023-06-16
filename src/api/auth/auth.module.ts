import { Module } from '@nestjs/common';

import { UsersModule } from '@/api/users/users.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'TEMP VALUE. WILL BE CHANGED TO REAL ONE.',
      signOptions: { expiresIn: '3d' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
