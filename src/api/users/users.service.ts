import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const conflictErrors: string[] = [];

    if (this.users.find(user => user.id === createUserDto.id)) {
      conflictErrors.push('이미 해당 아이디를 사용하는 유저가 존재합니다.');
    }

    if (this.users.find(user => user.email === createUserDto.email)) {
      conflictErrors.push('이미 해당 이메일을 사용하는 유저가 존재합니다.');
    }

    if (conflictErrors.length > 0) {
      throw new ConflictException(conflictErrors);
    }

    const user = createUserDto;

    this.users.push(user);

    return user;
  }

  findOne(id: string) {
    const user = this.users.find(user => user.id === id);

    if (!user) {
      throw new NotFoundException(
        '해당 아이디를 가진 유저가 존재하지 않습니다.',
      );
    }

    return user;
  }
}
