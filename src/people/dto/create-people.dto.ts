import { IsString } from 'class-validator';

export class CreatePeopleDto {
  // 출신 학교
  @IsString()
  school: string;

  // 전공
  @IsString()
  major: string;

  // 활동 지역
  @IsString()
  activityArea: string;

  // 자기 소개
  @IsString()
  description: string;

  // 포트폴리오
  @IsString()
  portfolio: string;

  // 휴대폰 번호
  @IsString()
  phoneNumber: string;

  // 이메일
  @IsString()
  email: string;

  // 비밀번호
  @IsString()
  password: string;
}
