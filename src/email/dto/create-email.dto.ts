// 라이브러리 등록
import { IsString } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  address: string;
}
