// 라이브러리 등록
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// 스키마 등록
import { Company, CompanyDocument } from './schemas/company.schema';

// Data Transfer Object 등록
import { CreateCompanyDto } from './dto/create-company.dto';

// 서비스 등록
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(company): Promise<Company> {
    const createdCompany = new this.companyModel(company);
    return createdCompany.save();
  }

  async signUp(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { email, password, ...remainder } = createCompanyDto;
    const user = await this.usersService.signUp(email, password, 'company');
    return await this.create({
      ...remainder,
      userObjectId: user._id,
    });
  }

  async findAll(): Promise<Array<Company>> {
    return await this.companyModel.find({});
  }
}
