// 라이브러리 등록
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// 스키마 등록
import { People, PeopleDocument } from './schemas/people.schema';

// Data Transfer Object 등록
import { CreatePeopleDto } from './dto/create-people.dto';

// 서비스 등록
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(People.name) private peopleModel: Model<PeopleDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(people): Promise<People> {
    const createdPeople = new this.peopleModel(people);
    return createdPeople.save();
  }

  // 피플 회원가입
  async signUp(createPeopleDto: CreatePeopleDto): Promise<People> {
    const { email, password, ...remainder } = createPeopleDto;
    const user = await this.usersService.signUp(email, password, 'people');
    const people = await this.create({
      ...remainder,
      userObjectId: user._id,
    });
    return people;
  }

  // 전체 피플 목록 조회
  async findAll(): Promise<Array<People>> {
    const peopleList = await this.peopleModel.find({});
    return peopleList;
  }
}
