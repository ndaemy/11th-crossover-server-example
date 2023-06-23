import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsString({
    message: '제목은 문자열이여야 합니다.',
  })
  @IsNotEmpty({
    message: '제목은 비어있으면 안됩니다.',
  })
  @MaxLength(20, {
    message: '제목은 20글자 이하여야 합니다.',
  })
  title: string;

  @IsString({
    message: '내용은 문자열이여야 합니다.',
  })
  @IsNotEmpty({
    message: '내용은 비어있으면 안됩니다.',
  })
  @MaxLength(140, {
    message: '내용은 140글자 이하여야 합니다.',
  })
  content: string;
}
