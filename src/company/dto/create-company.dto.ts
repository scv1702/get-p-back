// 라이브러리 등록
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: '회사명',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '업종',
  })
  @IsString()
  industry: string;

  @ApiProperty({
    description: '대표자',
  })
  @IsString()
  ceo: string;

  @ApiProperty({
    description: '소개 및 설명',
  })
  @IsString()
  introduction: string;

  @ApiProperty({
    description: '대표자 전화번호',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: '웹사이트 주소',
  })
  @IsString()
  url: string;

  @ApiProperty({
    description: '회사 주소',
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: '이메일',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: '비밀번호',
  })
  @IsString()
  password: string;
}
