import { IsString, IsNumber } from 'class-validator';

export class CreateProjectDto {
  // 프로젝트 미팅 방식. 온라인: 0, 오프라인: 1
  @IsNumber()
  meeting: number;

  // 성공 보수
  @IsNumber()
  successPay: number;

  // 실패 보증금
  @IsNumber()
  failDeposit: number;

  // 프로젝트 유형
  @IsString()
  category: string;

  // 프로젝트 제목
  @IsString()
  title: string;

  // 프로젝트 상세 설명
  @IsString()
  description: string;

  // 첨부 파일 (첨부 파일 URL)
  @IsString()
  attachmentUrl: string;

  // 지원자 모집 마감일
  @IsString()
  applicationDeadline: string;

  // 작업 마감일
  @IsString()
  deadline: string;

  // 작업 기간 (일 단위)
  @IsNumber()
  duration: number;

  // 프로젝트 태그 (최대 8개)
  @IsString({ each: true })
  tag: [string];
}
