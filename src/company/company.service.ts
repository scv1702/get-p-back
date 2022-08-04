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
    const {
      name,
      // companyImage,
      industry,
      ceo,
      description,
      phoneNumber,
      url,
      address,
      email,
      password,
    } = createCompanyDto;
    const user = await this.usersService.signUp(email, password, 'company');
    const company = await this.create({
      name,
      // companyImage,
      industry,
      ceo,
      description,
      phoneNumber,
      url,
      address,
      userObjectId: user._id,
    });
    return company;
  }

  async findAll(): Promise<Array<Company>> {
    const companyList = await this.companyModel.find({});
    return companyList;
  }
}
