// 라이브러리 등록
import { IsOptional, IsString } from 'class-validator';

export class CreateHashtagDto {
  @IsString()
  content: string;

  @IsString()
  color: string;

  @IsString()
  @IsOptional()
  peopleObjectId: string;

  @IsString()
  @IsOptional()
  projectObjectId: string;
}
