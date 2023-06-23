import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsAlphanumeric()
  @MinLength(5)
  @MaxLength(10)
  id: string;

  @IsString()
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|(){}\[\]:;"'<>,.?/])[A-Za-z\d~!@#$%^&*_\-+=`|(){}\[\]:;"'<>,.?/]{8,13}$/,
    {
      message: '비밀번호는 영문, 숫자, 특수문자를 포함한 8~13자리여야 합니다.',
    },
  )
  password: string;

  @IsEmail()
  email: string;
}
