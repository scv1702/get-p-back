import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    description: '프로젝트 미팅 방식. 온라인: 0, 오프라인: 1',
  })
  @IsNumber()
  meeting: number;

  @ApiProperty({
    description: '성공 보수',
  })
  @IsNumber()
  successPay: number;

  @ApiProperty({
    description: '실패 보증금',
  })
  @IsNumber()
  failDeposit: number;

  @ApiProperty({
    description: '프로젝트 유형',
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: '프로젝트 제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '프로젝트 상세 설명',
  })
  @IsString()
  introduction: string;

  // @ApiProperty({
  //   description: '첨부 파일',
  // })
  // @IsString()
  // attachmentUrl: string;

  @ApiProperty({
    description: '지원자 모집 마감일',
  })
  @IsString()
  applicationDeadline: string;

  @ApiProperty({
    description: '작업 마감일',
  })
  @IsString()
  deadline: string;

  @ApiProperty({
    description: '작업 기간(일 단위)',
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    description: '프로젝트 태그(최대 8개)',
  })
  @IsString({ each: true })
  tag: [string];
}
