// 라이브러리 등록
import { IsString } from 'class-validator';

export class VerifyUserDto {
  // 이메일 주소
  @IsString()
  address: string;

  // 검증 코드
  @IsString()
  code: string;
}
