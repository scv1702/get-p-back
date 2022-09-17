import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  message: string;

  @IsString()
  channel: string;
}
