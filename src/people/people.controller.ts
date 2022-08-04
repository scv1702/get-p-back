// 라이브러리 등록
import { Controller, Get, Post, Body } from '@nestjs/common';

// Data Transfer Object 등록
import { CreatePeopleDto } from './dto/create-people.dto';

// 서비스 등록
import { PeopleService } from './people.service';

// 스키마 등록
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
