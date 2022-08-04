import { IsString } from 'class-validator';

export class CreateCompanyDto {
  // 기업명
  @IsString()
  name: string;

  // 기업 프로필 사진
  // @IsString()
  // companyImage: string;

  // 업종
  @IsString()
  industry: string;

  // 대표자
  @IsString()
  ceo: string;

  // 기업 소개
  @IsString()
  description: string;

  // 대표 전화
  @IsString()
  phoneNumber: string;

  // 웹 사이트
  @IsString()
  url: string;

  // 기업 주소
  @IsString()
  address: string;

  // 이메일
  @IsString()
  email: string;

  // 비밀번호
  @IsString()
  password: string;
}
