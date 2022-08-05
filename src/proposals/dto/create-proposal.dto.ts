import { IsString } from 'class-validator';

export class CreateProposalDto {
  @IsString()
  description: string;
}
