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
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,10}$/)
  password: string;

  @IsEmail()
  email: string;
}
