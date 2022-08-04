import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './schemas/company.schema';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // 전체 회사 목록 조회
  @Get()
  async findAll(): Promise<Array<Company>> {
    const companyList = await this.companyService.findAll();
    return companyList;
  }

  // 회사 회원가입
  @Post()
  async signUp(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = await this.companyService.signUp(createCompanyDto);
    return company;
  }
}
