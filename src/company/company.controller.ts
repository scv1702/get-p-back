// 라이브러리 등록
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Put,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

// 서비스 등록
import { CompanyService } from './company.service';

// Data Transfer Object 등록
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-people.dto';

// 스키마 등록
import { Company } from './schemas/company.schema';

@ApiTags('회사')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  // 전체 회사 목록 조회
  @ApiOkResponse({ description: '전체 회사 목록을 반환합니다.' })
  @Get()
  async findAll(): Promise<Array<Company>> {
    return await this.companyService.findAll();
  }

  // 회사 회원가입
  @ApiCreatedResponse({
    description: 'Get-P 회사로 회원 가입이 완료되었습니다.',
  })
  @ApiBody({ type: CreateCompanyDto })
  @Post()
  async signUp(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyService.signUp(createCompanyDto);
  }

  // 회사 회원 탈퇴
  @ApiNoContentResponse({
    description: 'Get-P 회원 탈퇴가 완료되었습니다.',
  })
  @ApiForbiddenResponse({
    description: '허가되지 않은 접근입니다.',
  })
  @ApiParam({
    description: '회사 ObjectId',
    name: 'companyId',
  })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':companyId')
  async delete(@Param('companyId') companyId: string, @Request() req) {
    const company = await this.companyService.findOne({ _id: companyId });
    if (company.userObjectId.toString() === req.user._id) {
      await this.companyService.delete(company._id.toString(), req.user._id);
      return { message: 'Get-P 회원 탈퇴가 완료되었습니다.' };
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }

  // 회사 회원 정보 수정
  @ApiNoContentResponse({
    description: '회원 정보가 수정되었습니다.',
  })
  @ApiForbiddenResponse({
    description: '허가되지 않은 접근입니다.',
  })
  @ApiParam({
    description: '회사 ObjectId',
    name: 'companyId',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put(':companyId')
  @ApiBody({ type: UpdateCompanyDto })
  async update(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Request() req,
  ): Promise<Company> {
    const company = await this.companyService.findOne({ _id: companyId });
    if (company.userObjectId.toString() === req.user._id) {
      return await this.companyService.update(
        company._id.toString(),
        updateCompanyDto,
      );
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }
}
