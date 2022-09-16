// 라이브러리 등록
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePeopleDto {
  @ApiProperty({
    description: '이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '출신 학교',
  })
  @IsString()
  school: string;

  @ApiProperty({
    description: '전공',
  })
  @ApiProperty()
  @IsString()
  major: string;

  @ApiProperty({
    description: '활동 지역',
  })
  @IsString()
  activityArea: string;

  @ApiProperty({
    description: '자기 소개',
  })
  @IsString()
  introduction: string;

  @ApiProperty({
    description: '포트폴리오',
  })
  @IsString()
  portfolio: string;

  @ApiProperty({
    description: '휴대폰 번호',
  })
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: '이메일',
  })
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty({
    description: '비밀번호',
  })
  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({
    description: '태그(최대 8개)',
  })
  @IsString({ each: true })
  tags: [string];
}
