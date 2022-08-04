import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreatePeopleDto } from './dto/create-people.dto';
import { PeopleService } from './people.service';
import { People } from './schemas/people.schema';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  // 전체 피플 목록 조회
  @Get()
  async findAll(): Promise<Array<People>> {
    const peopleList = await this.peopleService.findAll();
    return peopleList;
  }

  // 피플 회원가입
  @Post()
  async signUp(@Body() createPeopleDto: CreatePeopleDto): Promise<People> {
    const people = await this.peopleService.signUp(createPeopleDto);
    return people;
  }
}
