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
import { UpdatePeopleDto } from './dto/update-people.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectModel(People.name) private peopleModel: Model<PeopleDocument>,
    private readonly usersService: UsersService,
  ) {}

  // 피플 도큐먼트 생성
  async create(people): Promise<People> {
    const createdPeople = new this.peopleModel(people);
    return createdPeople.save();
  }

  // 피플 회원 가입
  async signUp(createPeopleDto: CreatePeopleDto): Promise<People> {
    const { email, password, ...remainder } = createPeopleDto;
    const user = await this.usersService.signUp(email, password, 'people');
    return await this.create({
      ...remainder,
      userObjectId: user._id,
    });
  }

  // 피플 조회
  async findOne(queries: object = {}): Promise<People> {
    return await this.peopleModel.findOne(queries);
  }

  // 전체 피플 목록 조회
  async findAll(): Promise<Array<People>> {
    return await this.peopleModel.find({});
  }

  // 피플 회원 탈퇴
  async delete(peopleId: string, userId: string) {
    await this.peopleModel.findByIdAndRemove(peopleId);
    await this.usersService.delete(userId);
  }

  // 회사 조회
  async find(options: object = {}): Promise<Array<People>> {
    return await this.peopleModel.find(options);
  }

  // 피플 화원 정보 수정
  async update(
    peopleId: string,
    updatePeopleDto: UpdatePeopleDto,
  ): Promise<People> {
    return await this.peopleModel.findByIdAndUpdate(peopleId, updatePeopleDto, {
      new: true,
    });
  }

  // 피플 프로필 사진 등록
  async uploadImage(peopleId: string, image: Express.Multer.File) {
    return await this.peopleModel.findByIdAndUpdate(
      peopleId,
      { image: image.filename },
      { new: true },
    );
  }
}
