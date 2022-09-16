// 라이브러리 등록
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: '비밀번호',
  })
  @IsString()
  password: string;
}
