import { IsString, IsNumber } from 'class-validator';

export class SelectPerformerDto {
  // 프로젝트 미팅 방식. 온라인: 0, 오프라인: 1
  @IsString()
  proposalId: string;
}
