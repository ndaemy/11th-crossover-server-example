import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostQuery {
  @IsOptional()
  @IsInt({
    message: 'page는 숫자여야 합니다.',
  })
  @Min(1, {
    message: 'page는 1보다 같거나 커야 합니다.',
  })
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt({
    message: 'size는 숫자여야 합니다.',
  })
  @Max(30, {
    message: 'size는 30보다 작아야 합니다.',
  })
  @Type(() => Number)
  size?: number;
}
