import { OmitType } from '@nestjs/mapped-types';
import { CreatePeopleDto } from './create-people.dto';

export class UpdatePeopleDto extends OmitType(CreatePeopleDto, [
  'email',
  'password',
] as const) {}
