// 라이브러리 등록
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// 스키마 등록
import { Company, CompanyDocument } from './schemas/company.schema';

// Data Transfer Object 등록
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-people.dto';

// 서비스 등록
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
    private readonly usersService: UsersService,
  ) {}

  // 회사 도큐먼트 생성
  async create(company): Promise<Company> {
    const createdCompany = new this.companyModel(company);
    return createdCompany.save();
  }

  // 회사 회원가입
  async signUp(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { email, password, ...remainder } = createCompanyDto;
    const user = await this.usersService.signUp(email, password, 'company');
    return await this.create({
      ...remainder,
      userObjectId: user._id,
    });
  }

  // 전체 회사 목록 조회
  async findAll(): Promise<Array<Company>> {
    return await this.companyModel.find({});
  }

  // 회사 조회
  async findOne(queries: object = {}): Promise<Company> {
    return await this.companyModel.findOne(queries);
  }

  // 회사 회원 탈퇴
  async delete(companyId: string, userId: string) {
    await this.companyModel.findByIdAndRemove(companyId);
    await this.usersService.delete(userId);
  }

  // 회사 화원 정보 수정
  async update(
    companyId: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return await this.companyModel.findByIdAndUpdate(
      companyId,
      updateCompanyDto,
      {
        new: true,
      },
    );
  }
}
