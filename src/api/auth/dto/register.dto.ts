import {
  IsAlphanumeric,
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsAlphanumeric('en-US', { message: '아이디는 영문, 숫자만 가능합니다.' })
  @MinLength(5, { message: '아이디는 5자 이상이어야 합니다.' })
  @MaxLength(10, { message: '아이디는 10자 이하여야 합니다.' })
  id: string;

  @IsString()
  @Matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|(){}\[\]:;"'<>,.?/])[A-Za-z\d~!@#$%^&*_\-+=`|(){}\[\]:;"'<>,.?/]{8,14}$/,
    {
      message: '비밀번호는 영문, 숫자, 특수문자를 포함한 8~14 자리여야 합니다.',
    },
  )
  password: string;

  @IsEmail(
    {},
    {
      message: '이메일 형식이 아닙니다.',
    },
  )
  email: string;
}
