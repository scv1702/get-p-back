import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SelectPerformerDto {
  @ApiProperty({
    description: '제안 ObjectId',
  })
  @IsString()
  proposalId: string;
}
