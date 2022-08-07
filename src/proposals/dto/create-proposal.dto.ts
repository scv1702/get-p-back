import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProposalDto {
  @ApiProperty({
    description: '제안 상세 설명',
  })
  @IsString()
  introduction: string;
}
