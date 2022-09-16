// 라이브러리 등록
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UseGuards,
  Put,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

// 서비스 등록
import { CompanyService } from './company.service';
import { UsersService } from 'src/users/users.service';

// Data Transfer Object 등록
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-people.dto';

// 스키마 등록
import { Company } from './schemas/company.schema';

@ApiTags('회사')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly usersService: UsersService,
  ) {}

  // 전체 회사 목록 조회
  @ApiOkResponse({ description: '전체 회사 목록을 반환합니다.' })
  @Get()
  async findAll(): Promise<Array<Company>> {
    return await this.companyService.findAll();
  }

  // 회사 등록
  @ApiCreatedResponse({
    description: 'Get-P 회사로 등록이 완료되었습니다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async signUp(
    @Body() createCompanyDto: CreateCompanyDto,
    @Req() req,
  ): Promise<Company> {
    const userId = req.user._id;
    const user = await this.usersService.findOne({ _id: userId });
    if (!user.category && !user.companyObjectId) {
      return await this.companyService.signUp(userId, createCompanyDto);
    }
  }

  // 회사 정보 수정
  @ApiNoContentResponse({
    description: '회사 정보가 수정되었습니다.',
  })
  @ApiForbiddenResponse({
    description: '허가되지 않은 접근입니다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @Put()
  @ApiBody({ type: UpdateCompanyDto })
  async update(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req,
  ): Promise<Company> {
    const userId = req.user._id;
    const user = await this.usersService.findOne({ _id: userId });
    if (user.companyObjectId) {
      return await this.companyService.update(
        user.companyObjectId.toString(),
        updateCompanyDto,
      );
    }
    throw new ForbiddenException('허가되지 않은 접근입니다.');
  }
}
