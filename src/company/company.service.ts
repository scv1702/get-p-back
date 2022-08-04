import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
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
