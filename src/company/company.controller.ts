// 라이브러리 등록
import { Body, Controller, Get, Post } from '@nestjs/common';

// 서비스 등록
import { CompanyService } from './company.service';

// Data Transfer Object 등록
import { CreateCompanyDto } from './dto/create-company.dto';

// 스키마 등록
import { Company } from './schemas/company.schema';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // 전체 회사 목록 조회
  @Get()
  async findAll(): Promise<Array<Company>> {
    return await this.companyService.findAll();
  }

  // 회사 회원가입
  @Post()
  async signUp(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyService.signUp(createCompanyDto);
  }
}
