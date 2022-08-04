import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { People, PeopleDocument } from './schemas/people.schema';
import { CreatePeopleDto } from './dto/create-people.dto';
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

  async signUp(createPeopleDto: CreatePeopleDto): Promise<People> {
    const {
      school,
      major,
      activityArea,
      description,
      portfolio,
      phoneNumber,
      email,
      password,
    } = createPeopleDto;
    const user = await this.usersService.signUp(email, password, 'people');
    const people = await this.create({
      school,
      major,
      activityArea,
      description,
      portfolio,
      phoneNumber,
      userObjectId: user._id,
    });
    return people;
  }

  async findAll(): Promise<Array<People>> {
    const peopleList = await this.peopleModel.find({});
    return peopleList;
  }
}
